<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\{ ListRepository };
use Illuminate\Support\Facades\Gate;
use App\Models\{UserTarget, User, Payment};
class UserTargetControler extends Controller
{
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(UserTarget::class);
    }

    public function index(Request $request)
    {
        $users = User::where('role_id', $request->role_id)->select('name', 'id');
        if($request->user()->role_id==4){
            $users = $users->where('reporting_user_id', $request->user()->id);
        }
        $users = $users->get();
        $targets = UserTarget::where('role_id', $request->role_id)
        ->whereYear('for_month', date('Y',strtotime($request->date)))
        ->whereMonth('for_month', date('m',strtotime($request->date)))
        ->whereIn('user_id',$users->pluck('id'))->get();
        $targetAssignedtoBuhUsers = 0;
        foreach($users as &$user){
            $user->target = null;
            $sumOfUserPayment = Payment::where('status',1)
            ->whereYear('created_at', date('Y',strtotime($request->date)))
            ->whereMonth('created_at', date('m',strtotime($request->date)))
            ->where('user_id',$user->id)
            ->sum('amount');
            $user->achieved = $sumOfUserPayment;
            if($targets->where('user_id', $user->id)->count()>0){
                $user->target = $targets->where('user_id', $user->id)->first();
                if($user->target){
                    $targetAssignedtoBuhUsers+=$user->target->amount;
                }
                if($request->role_id==4){
                    $buhTeam = User::where('reporting_user_id', $user->id)->select('id')->get();
                    $sumOfUserTeamPayment = Payment::whereMonth('created_at', date('m',strtotime($request->date)))
                    ->whereYear('created_at', date('Y',strtotime($request->date)))
                    ->where('status',1)
                    ->whereIn('user_id',$buhTeam->pluck('id'))->sum('amount');
                    $user->achieved = ($sumOfUserPayment+$sumOfUserTeamPayment);
                }
            }
        }
        $currentBuhTarget = UserTarget::where('role_id', 4)
        ->whereYear('for_month', date('Y',strtotime($request->date)))
        ->whereMonth('for_month', date('m',strtotime($request->date)))
        ->where('user_id',auth()->user()->id)->first();
        $targetLeftToAssign = 0;
        if($currentBuhTarget){
            $targetLeftToAssign = ($currentBuhTarget->amount-$targetAssignedtoBuhUsers);
        }
        return response()->json(['users' => $users, 'targets' => $targets, 'currentBuhTarget' => $currentBuhTarget, 'targetLeftToAssign' => $targetLeftToAssign]);
    }
    public function setTarget(Request $request){
        UserTarget::where('role_id', $request->role_id)
        ->whereYear('for_month', date('Y',strtotime($request->for_month)))
        ->whereMonth('for_month', date('m',strtotime($request->for_month)))
        ->where('user_id', $request->user_id)->delete();
        UserTarget::create([
            'user_id' => $request->user_id,
            'role_id' => $request->role_id,
            'for_month' => $request->for_month,
            'marketing' => (isset($request->marketing)?$request->marketing:0),
            'amount' => floatval($request->amount),
            'inflated_percentage_marketing' => floatval($request->inflated_percentage_marketing),
        ]);
        return response()->json(['status' => true]);
    }
}
