<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\{Payment, User};
use Illuminate\Http\Request;
use App\Repositories\{ ListRepository };
use Illuminate\Support\Facades\Gate;
use App\Mail\{InvoiceCreated, InvoicePaid};
use Illuminate\Support\Facades\Mail;
use DB;
use Stripe;

class PaymentController extends Controller
{
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(Payment::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('viewAny',Payment::class);
        $query = $this->listRep->listFilteredQuery(['customer_name', 'customer_email', 'description', 'services', 'amount', 'sales_email'])
        ->select('payments.*');
        if(auth()->user()->role_id!=1){
            if(auth()->user()->role_id==4){
                $users = [auth()->user()->id, ...User::where('reporting_user_id', auth()->user()->id)->get()->pluck('id')];
                $query = $query->whereIn('user_id', $users);
            }else{
                $query = $query->where('user_id', auth()->user()->id);
            }
        }
        if(isset($_GET['brand_id'])&&intval($_GET['brand_id'])>0){
            $query=$query->where('brand_id', $_GET['brand_id']);
        }
        if(isset($_GET['user_id'])&&intval($_GET['user_id'])>0){
            $query=$query->where('user_id', $_GET['user_id']);
        }
        if(isset($_GET['payment_gateway'])&&intval($_GET['payment_gateway'])>0){
            $query=$query->where('payment_gateway', $_GET['payment_gateway']);
        }
        if(isset($_GET['status'])&&intval($_GET['status'])>=0){
            $query=$query->where('status', $_GET['status']);
        }
        $query = $query->with('user','brand', 'merchant');
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return PaymentResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PaymentRequest $request)
    {
        Gate::authorize('create',Payment::class);
        $payment = Payment::create($request->only('user_id','brand_id', 'payment_gateway','send_invoice','description','services','amount','customer_name','customer_email', 'sales_email', 'subtotal', 'allow_tax', 'tax_percent'));
        $payment->save();
        if($request->amount>3000){
            $payment->update([
                'status' => 4
            ]);
        }
        $payment->update([
            'tracking_id' => DB::raw('uuid()')
        ]);
        $payment = $payment->fresh(); 
        // Mail::to($request->customer_email)->send(new InvoiceCreated($payment));
        return new PaymentResource($payment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        Gate::authorize('view',$payment);
        return new PaymentResource($payment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(PaymentRequest $request, Payment $payment)
    {
        Gate::authorize('update',$payment);
        $payment->update($request->only('user_id','brand_id', 'payment_gateway','send_invoice','description','services','amount','customer_name','customer_email', 'sales_email', 'subtotal', 'allow_tax', 'tax_percent'));
        return new PaymentResource($payment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        Gate::authorize('delete',$payment);
        $payment->history()->delete();
        $payment->delete();
        return response()->json(null, 204);
    }
    public function updatePaymentStatus(Request $request, Payment $payment){
        $payment->update([
            'status' => $request->status,
            'failed_reason' => $request->failed_reason,
            'merchant_transaction_id' => $request->merchant_transaction_id,
        ]);
        if($request->status!=0){
            $payment->history()->create([
                'status' => $request->status,
                'message' => ($request->failed_reason?$request->failed_reason:$request->merchant_transaction_id),
            ]);
        }else{
            $payment->history()->create([
                'status' => $request->status,
                'message' => 'Marked Pending By Admin',
            ]);
        }
        return response()->json(['status'=> true]);
    }
    public function recheckMerchant(Payment $payment){
        if($payment->status!=1)
        {
            if($payment->merchant->merchant_type==2){
                //Stripe
                $stripePK = $payment->merchant->json_data->key1;
                $stripeSK = $payment->merchant->json_data->key2;
                $stripe = new \Stripe\StripeClient(
                    $stripeSK
                );
                $charge = $stripe->charges->retrieve(
                    $payment->merchant_transaction_id,[]
                );
                if(isset($charge->status)){
                    if(strtolower($charge->status)=='succeeded'){
                        $payment->update([
                            'merchant_transaction_id' => $charge->id,
                            'status' => 1
                        ]);
                        $payment->history()->create([
                            'status' => 1,
                            'message' => $charge->id,
                        ]);
                        // Mail::to($payment->customer_email)->send(new InvoicePaid($payment));
                        return response()->json(['status'=> true]);
                    }
                }
            }
        }
    }
}
