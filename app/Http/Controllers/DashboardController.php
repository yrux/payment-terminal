<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{UserTarget, Payment, PaymentRefund, User, MarketingExpense, Brand, BrandFormSubmission};
class DashboardController extends Controller
{
    public function adminBoard(){
        $date = date('Y-m-d');
        if(!empty($_GET['date'])){
            $date = date('Y-m-d', strtotime($_GET['date']));
        }
        $brands = Brand::select('id')->get()->pluck('id');
        $user_ids_buh = [];
        //overall department targets for selected month
        $overAllTargets = UserTarget::where('role_id', 4)
        ->whereYear('for_month', date('Y',strtotime($date)))
        ->whereMonth('for_month', date('m',strtotime($date)));
        if(!empty($_GET['user_id'])){
            $users_reports_to = User::where('reporting_user_id', $_GET['user_id'])->select('id')->get();
            $brands = User::find($_GET['user_id'])->brands->pluck('brand_id');
            $user_ids_buh = [$_GET['user_id'], ...$users_reports_to->pluck('id')];
            $overAllTargets = $overAllTargets->where('user_id', $_GET['user_id']);
        }
        $overAllTargets = $overAllTargets->get();
        $marketingSumOverall = $overAllTargets->sum('marketing');
        $targetSumOverall = $overAllTargets->sum('amount');
        $formQueriesReceived = BrandFormSubmission::whereMonth('created_at', date('m',strtotime($date)))
        ->whereYear('created_at', date('Y',strtotime($date)))
        ->whereIn('brand_id', $brands)->count();
        $marketingSpentOverall = MarketingExpense::whereMonth('for_day', date('m',strtotime($date)))
        ->whereYear('for_day', date('Y',strtotime($date)))
        ->whereIn('brand_id', $brands)
        ->where('request_amendments', 0)
        ->sum('amount');
        /*checking last 10 days, and updating Inflated Marketing*/
        $day = intval(date('d'));
        $inflatedMarketingSumOverall = 0;
        if(!empty($_GET['user_id'])){
            //in last 10 days of work
            $marketingExpensesList = MarketingExpense::whereMonth('for_day', date('m',strtotime($date)))
            ->whereYear('for_day', date('Y',strtotime($date)))
            ->whereIn('brand_id', $brands)
            ->where('request_amendments', 0)->get();
            $target = UserTarget::where('role_id', 4)
            ->whereYear('for_month', date('Y',strtotime($date)))
            ->whereMonth('for_month', date('m',strtotime($date)))
            ->where('user_id', $_GET['user_id'])->first();
            $marketingSpentInflated = 0;
            // $day = 14;
            foreach($marketingExpensesList as $marketingExpense){
                if($marketingExpense->source->flag_value=='SMM'||$marketingExpense->source->flag_value=='PPC'){
                    if($target->inflated_percentage_marketing>0){
                        if($day>15){
                            $marketingSpentInflated += ($marketingExpense->amount+(($marketingExpense->amount/100)*$target->inflated_percentage_marketing));
                        }else if($day<15){
                            $marketingSpentInflated += ($marketingExpense->amount+(($marketingExpense->amount/100)*($target->inflated_percentage_marketing/2)));
                        }
                    }else{
                        $marketingSpentInflated += ($marketingExpense->amount);
                    }
                }else{
                    $marketingSpentInflated += ($marketingExpense->amount);
                }
            }
            $inflatedMarketingSumOverall = $marketingSpentInflated;
        }else{
            $inflatedMarketingSumOverall = $marketingSpentOverall;
        }
        /*checking last 10 days, and updating Inflated Marketing end*/
        $acheivedSumOverall = Payment::whereMonth('created_at', date('m',strtotime($date)))
        ->whereYear('created_at', date('Y',strtotime($date)))
        ->where('status',1);
        if(!empty($_GET['user_id'])){
            $acheivedSumOverall = $acheivedSumOverall->whereIn('user_id', $user_ids_buh);
        }
        $acheivedSumOverall = $acheivedSumOverall->sum('amount');
        $overallRefunds = PaymentRefund::whereYear('refund_date', date('Y',strtotime($date)))
        ->whereMonth('refund_date', date('m',strtotime($date)))->where('refund_type', 0);
        if(!empty($_GET['user_id'])){
            $overallRefunds = $overallRefunds->whereIn('user_id', $user_ids_buh);
        }
        $overallRefunds = $overallRefunds->sum('amount');
        $overallChargback = PaymentRefund::whereYear('refund_date', date('Y',strtotime($date)))
        ->whereMonth('refund_date', date('m',strtotime($date)))->where('refund_type', 1);
        if(!empty($_GET['user_id'])){
            $overallChargback = $overallChargback->whereIn('user_id', $user_ids_buh);
        }
        $overallChargback = $overallChargback->sum('amount');
        $netOverall = 0;
        $refundChargebacks = ($overallRefunds+$overallChargback);
        $netOverall = ((($acheivedSumOverall-$marketingSpentOverall))-$refundChargebacks);
        $lag_percentage = 0;
        try{
            if($targetSumOverall>0){
                $lag_percentage = (((($targetSumOverall+$marketingSumOverall)-$acheivedSumOverall)/($targetSumOverall+$marketingSumOverall))*100);
            }
        }catch(\Exception $ex){}
        return response()->json([
            'overall' => [
                'marketing' => number_format($marketingSumOverall,2),
                'marketing_spent' => number_format($marketingSpentOverall,2),
                'inflated_marketing_spent' => number_format($inflatedMarketingSumOverall,2),
                'target' => number_format($targetSumOverall,2),
                'achieved' => number_format($acheivedSumOverall,2),
                'refunds' => number_format($overallRefunds,2),
                'chargebacks' => number_format($overallChargback,2),
                'net' => number_format($netOverall,2),
                'brand_queries' => $formQueriesReceived,
                'lag_percentage' => number_format($lag_percentage,2),
                'marketing_left_percent' => (($marketingSpentOverall/$marketingSumOverall)*100),
                'target_left_percent' => (($acheivedSumOverall/($targetSumOverall+$marketingSumOverall))*100),
                'net_target' => number_format(($targetSumOverall+$marketingSumOverall),2)
            ]
        ]);
    }
}
