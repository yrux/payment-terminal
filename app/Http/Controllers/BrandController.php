<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\{Brand, BrandMerchant};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Repositories\{ ListRepository, FileRepository };

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $listRep;
    protected $file;
    public function __construct(ListRepository $listRep, FileRepository $file)
    {
        $this->listRep = $listRep;
        $this->file = $file;
        $this->listRep->bindModel(Brand::class);
    }
    public function index()
    {
        $query = $this->listRep->listFilteredQuery(['name', 'url', 'brief_notification_emails'])
        ->select('brands.*');
        if(auth()->user()->role_id!=1){
            $query = $query->whereIn('id', auth()->user()->brands->pluck('brand_id'));
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return BrandResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandRequest $request)
    {
        Gate::authorize('create',Brand::class);
        $brand = Brand::create($request->only('name', 'url', 'terms_and_conditions', 'brief_notification_emails'));
        if($request->merchant_ids){
            foreach($request->merchant_ids as $merchant_id){
                BrandMerchant::create([
                    'brand_id' => $brand->id,
                    'merchant_id' => $merchant_id
                ]);
            }
        }
        if($request->image){
            $this->file->create([$request->image], 'brands', $brand->id, 1);
        }
        return new BrandResource($brand);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        // Gate::authorize('view',$brand);
        $brand->load('briefforms');
        return new BrandResource($brand);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(BrandRequest $request, Brand $brand)
    {
        Gate::authorize('update',$brand);
        $brand->update($request->only('name','url', 'terms_and_conditions', 'brief_notification_emails'));
        BrandMerchant::where('brand_id', $brand->id)->delete();
        if($request->merchant_ids){
            foreach($request->merchant_ids as $merchant_id){
                BrandMerchant::create([
                    'brand_id' => $brand->id,
                    'merchant_id' => $merchant_id
                ]);
            }
        }
        if($request->image){
            $this->file->create([$request->image], 'brands', $brand->id, 1);
        }
        return new BrandResource($brand);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        Gate::authorize('delete',$brand);
        $brand->delete();
        return response()->json(null, 204);
    }
    public function getBrandFromDomain(Request $request){
        $brand = Brand::where('url', $request->domain)->with('briefforms')->first();
        return response()->json(['domain'=>$request->domain, 'brand' => $brand]);
    }
}
