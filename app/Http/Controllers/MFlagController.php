<?php

namespace App\Http\Controllers;

use App\Http\Requests\MFlagRequest;
use App\Http\Resources\MFlagResource;
use App\Models\MFlag;
use App\Repositories\{ ListRepository };
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
class MFlagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $listRep;
    public function __construct(ListRepository $listRep)
    {
        $this->listRep = $listRep;
        $this->listRep->bindModel(MFlag::class);
    }
    public function index()
    {
        // Gate::authorize('viewAny',MFlag::class);
        $query = $this->listRep->listFilteredQuery(['flag_value', 'flag_type'])
        ->select('m_flags.*');//->where('is_for_admin',0);
        if(isset($_GET['flag_type'])){
            $query  = $query->where('flag_type', $_GET['flag_type']);
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return MFlagResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MFlagRequest $request)
    {
        Gate::authorize('create',MFlag::class);
        $mFlag = MFlag::create($request->only('flag_type','flag_value'));
        $mFlag->save();
        return new MFlagResource($mFlag);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function show(MFlag $mFlag)
    {
        Gate::authorize('view',$mFlag);
        return new MFlagResource($mFlag);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function update(MFlagRequest $request, MFlag $mFlag)
    {
        Gate::authorize('update',$mFlag);
        $mFlag->update($request->only('flag_value','flag_type'));
        return new MFlagResource($mFlag);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Http\Response
     */
    public function destroy(MFlag $mFlag)
    {
        Gate::authorize('delete',$mFlag);
        $mFlag->delete();
        return response()->json(null, 204);
    }
}
