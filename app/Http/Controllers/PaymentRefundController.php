<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PaymentRefundRequest;
use App\Models\PaymentRefund;
use App\Http\Resources\PaymentRefundResource;
use App\Repositories\{ ListRepository };
use Illuminate\Support\Facades\Gate;
class PaymentRefundController extends Controller
{
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(PaymentRefund::class);
    }
    public function index()
    {
        Gate::authorize('viewAny',PaymentRefund::class);
        $query = $this->listRep->listFilteredQuery(['notes', 'amount', 'refund_id', 'refund_date'])
        ->select('payment_refunds.*');
        if(isset($_GET['brand_id'])&&intval($_GET['brand_id'])>0){
            $query=$query->where('brand_id', $_GET['brand_id']);
        }
        if(isset($_GET['user_id'])&&intval($_GET['user_id'])>0){
            $query=$query->where('user_id', $_GET['user_id']);
        }
        if(isset($_GET['merchant_id'])&&intval($_GET['merchant_id'])>0){
            $query=$query->where('merchant_id', $_GET['merchant_id']);
        }
        if(isset($_GET['refund_type'])){
            $query=$query->where('refund_type', intval($_GET['refund_type']));
        }
        $query = $query->with('user','brand', 'merchant');
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return PaymentRefundResource::collection($query);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PaymentRefundRequest $request)
    {
        Gate::authorize('create',PaymentRefund::class);
        $paymentRefund = PaymentRefund::create($request->only(
            "brand_id",
            "user_id",
            "merchant_id",
            "amount",
            "refund_type",
            "refund_id",
            "notes",
            "refund_date"
        ));
        $paymentRefund->save();
        return new PaymentRefundResource($paymentRefund);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentRefund $paymentRefund)
    {
        Gate::authorize('view',$paymentRefund);
        return new PaymentRefundResource($paymentRefund);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function update(PaymentRefundRequest $request, PaymentRefund $paymentRefund)
    {
        Gate::authorize('update',$paymentRefund);
        $paymentRefund->update($request->only(
            "brand_id",
            "user_id",
            "merchant_id",
            "amount",
            "refund_type",
            "refund_id",
            "notes",
            "refund_date"
        ));
        return new PaymentRefundResource($paymentRefund);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentRefund $paymentRefund)
    {
        Gate::authorize('delete',$paymentRefund);
        $paymentRefund->delete();
        return response()->json(null, 204);
    }
}
