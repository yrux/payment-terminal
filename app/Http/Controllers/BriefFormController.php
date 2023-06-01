<?php

namespace App\Http\Controllers;

use App\Http\Requests\BriefFormRequest;
use App\Http\Resources\BriefFormResource;
use App\Models\{ BriefForm, BriefFormBrand };
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Repositories\{ ListRepository };

class BriefFormController extends Controller
{
    protected $file;
    protected $listRep;

    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(BriefForm::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('viewAny',BriefForm::class);
        $query = $this->listRep->listFilteredQuery(['name'])
        ->select('brief_forms.*');
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return BriefFormResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BriefFormRequest $request)
    {
        Gate::authorize('create',BriefForm::class);
        $briefForm = BriefForm::create($request->only('name','formData','is_active'));
        return new BriefFormResource($briefForm);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BriefForm  $briefForm
     * @return \Illuminate\Http\Response
     */
    public function show(BriefForm $briefForm)
    {
        // dd($briefForm->brands()->toSql());
        Gate::authorize('view',$briefForm);
        $briefForm->load('brands');
        return new BriefFormResource($briefForm);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BriefForm  $briefForm
     * @return \Illuminate\Http\Response
     */
    public function update(BriefFormRequest $request, BriefForm $briefForm)
    {
        Gate::authorize('update',$briefForm);
        $briefForm->update($request->only('name','formData','is_active'));
        return new BriefFormResource($briefForm);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BriefForm  $briefForm
     * @return \Illuminate\Http\Response
     */
    public function destroy(BriefForm $briefForm)
    {
        Gate::authorize('delete',$briefForm);
        $briefForm->delete();
        return response()->json(null, 204);
    }

    public function assign(Request $request, BriefForm $briefForm){
        Gate::authorize('update',$briefForm);
        $data = $request->only('products');
        BriefFormBrand::where('brief_form_id', $briefForm->id)->delete();
        if(isset($request->products)){
            foreach($request->products as $pid){
                BriefFormBrand::create([
                    'brief_form_id' => $briefForm->id,
                    'brand_id' => $pid
                ]);
            }
        }
        $briefForm->load('brands');
        return new BriefFormResource($briefForm);
    }
}
