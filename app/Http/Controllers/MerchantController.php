<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\MerchantRequest;
use App\Repositories\{ ListRepository };
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\MerchantResource;
class MerchantController extends Controller
{
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(Merchant::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Gate::authorize('viewAny',Merchant::class);
        $query = $this->listRep->listFilteredQuery(['name', 'merchant_type'])
        ->select('merchants.*');
        if(isset($_GET['merchant_type'])&&intval($_GET['merchant_type'])>0){
            $query=$query->where('merchant_type', $_GET['merchant_type']);
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return MerchantResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MerchantRequest $request)
    {
        Gate::authorize('create',Merchant::class);
        $merchant = Merchant::create($request->only('name','merchant_type', 'data'));
        $merchant->save();
        return new MerchantResource($merchant);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function show(Merchant $merchant)
    {
        Gate::authorize('view',$merchant);
        $merchant = Merchant::where('id',$merchant->id)->first();
        $merchant->makeVisible(['data']);
        // $merchant->setVisible(['data']);
        return new MerchantResource($merchant);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function update(MerchantRequest $request, Merchant $merchant)
    {
        Gate::authorize('update',$merchant);
        $merchant->update($request->only('name','data', 'merchant_type'));
        return new MerchantResource($merchant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Merchant $merchant)
    {
        Gate::authorize('delete',$merchant);
        $merchant->delete();
        return response()->json(null, 204);
    }
}
