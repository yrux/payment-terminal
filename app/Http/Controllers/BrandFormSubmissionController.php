<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{BrandFormSubmission, Brand};
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\BrandFormSubmissionResource;
use App\Repositories\{ ListRepository };
use App\Mail\BrandFormQueryReceived;
use Illuminate\Support\Facades\Mail;
class BrandFormSubmissionController extends Controller
{
    protected $file;
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(BrandFormSubmission::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('viewAny',BrandFormSubmission::class);
        $query = $this->listRep->listFilteredQuery(['brand_form_submissions.name', 'email','phone', 'message','brand_id','brands.name'])
        ->select('brand_form_submissions.*', 'brands.name as brand_name')
        ->leftJoin('brands', 'brand_form_submissions.brand_id', '=', 'brands.id');
        if(isset($_GET['brand_id'])&&intval($_GET['brand_id'])>0){
            $query=$query->where('brand_id', $_GET['brand_id']);
        }
        if(auth()->user()->role_id!=1){
            $query = $query->whereIn('brand_id', auth()->user()->brands->pluck('brand_id'));
        }
        if(isset($_GET['from_date'])&&$_GET['from_date']!=''){
            $query = $query->whereDate('brand_form_submissions.created_at','>=',date('Y-m-d',strtotime($_GET['from_date'])));
        }
        if(isset($_GET['to_date'])&&$_GET['to_date']!=''){
            $query = $query->whereDate('brand_form_submissions.created_at','<=',date('Y-m-d',strtotime($_GET['to_date'])));
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return BrandFormSubmissionResource::collection($query);
    }
    public function store(Request $request){
        $brand = Brand::where('url', $request->domain)->first();
        $other_fields = json_encode($request->except(['name','email','phone','message']));
        $arr = $request->only(['name','email','phone','message']);
        $arr['brand_id'] = $brand->id;
        $arr['other_fields'] = $other_fields;
        $brandFormSubmission = BrandFormSubmission::create($arr);
        foreach($brand->brief_notification_emails_array as $email){
            if($email!=''){
                Mail::to($email)->send(new BrandFormQueryReceived($brandFormSubmission));
            }
        }
        return response()->json(['status'=>true]);
    }
    public function show(BrandFormSubmission $brandFormSubmission)
    {
        Gate::authorize('view',$brandFormSubmission);
        return new BrandFormSubmissionResource($brandFormSubmission);
    }
    public function update(Request $request, BrandFormSubmission $brandFormSubmission)
    {
        Gate::authorize('update',$brandFormSubmission);
        $brandFormSubmission->update($request->only('status'));
        return new BrandFormSubmissionResource($brandFormSubmission);
    }
    public function destroy(BrandFormSubmission $brandFormSubmission)
    {
        Gate::authorize('delete',$brandFormSubmission);
        $brandFormSubmission->notes()->delete();
        $brandFormSubmission->delete();
        return response()->json(null, 204);
    }
    public function addNote(Request $request, BrandFormSubmission $brandFormSubmission)
    {
        $brandFormSubmission->notes()->create([
            'user_id' => $request->user()->id,
            'note' => $request->note
        ]);
        $brandFormSubmission = $brandFormSubmission->fresh();
        return new BrandFormSubmissionResource($brandFormSubmission);
    }
}
