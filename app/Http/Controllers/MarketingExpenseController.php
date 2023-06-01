<?php

namespace App\Http\Controllers;

use App\Models\MarketingExpense;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\MarketingExpenseRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\MarketingExpenseResource;
use App\Repositories\{ ListRepository, FileRepository };
class MarketingExpenseController extends Controller
{
    protected $listRep;
    protected $file;
    public function __construct(ListRepository $listRep, FileRepository $file)
    {
        $this->listRep = $listRep;
        $this->file = $file;
        $this->listRep->bindModel(MarketingExpense::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $viewAny = Gate::inspect('viewAny',MarketingExpense::class);
        $viewMine = Gate::inspect('viewMine',MarketingExpense::class);

        $query = $this->listRep->listFilteredQuery(['for_day', 'amount', 'users.name'])
        ->select('marketing_expenses.*', 'users.name as user_name')
        ->leftJoin('users','marketing_expenses.user_id','=','users.id');;
        if ($viewAny->allowed()) {
            if(auth()->user()->role_id!=1){
                $query = $query->whereIn('id', auth()->user()->brands->pluck('brand_id'));
            }
        }else if ($viewMine->allowed()){
            $query = $query->where('user_id', auth()->user()->id);
            $query = $query->whereIn('brand_id', auth()->user()->brands->pluck('brand_id'));
        }else{
            Gate::authorize('viewAny',MarketingExpense::class);
            Gate::authorize('viewMine',MarketingExpense::class);
        }
        if(isset($_GET['brand_id'])&&intval($_GET['brand_id'])>0){
            $query=$query->where('brand_id', $_GET['brand_id']);
        }
        if(isset($_GET['user_id'])&&intval($_GET['user_id'])>0){
            $query=$query->where('user_id', $_GET['user_id']);
        }
        if(isset($_GET['service_id'])&&intval($_GET['service_id'])>0){
            $query=$query->where('m_flag_id', $_GET['service_id']);
        }
        if(isset($_GET['request_amendments'])&&intval($_GET['request_amendments'])>0){
            $query=$query->where('request_amendments', 1);
        }
        if(isset($_GET['from_date'])&&$_GET['from_date']!=''){
            $query = $query->whereDate('marketing_expenses.for_day','>=',date('Y-m-d',strtotime($_GET['from_date'])));
        }
        if(isset($_GET['to_date'])&&$_GET['to_date']!=''){
            $query = $query->whereDate('marketing_expenses.for_day','<=',date('Y-m-d',strtotime($_GET['to_date'])));
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return MarketingExpenseResource::collection($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MarketingExpenseRequest $request)
    {
        Gate::authorize('create',MarketingExpense::class);
        $arr = $request->only('brand_id', 'user_id', 'm_flag_id', 'for_date', 'amount', 'for_day');
        $arr['request_amendments'] = 0;
        $arr['amendment_message'] = '';
        $marketingExpense = MarketingExpense::create($arr);
        if($request->invoice){
            $this->file->create([$request->invoice], 'marketing_expenses', $marketingExpense->id, 1);
        }
        return new MarketingExpenseResource($marketingExpense);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MarketingExpense  $marketingExpense
     * @return \Illuminate\Http\Response
     */
    public function show(MarketingExpense $marketingExpense)
    {
        Gate::authorize('view',$marketingExpense);
        return new MarketingExpenseResource($marketingExpense);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MarketingExpense  $marketingExpense
     * @return \Illuminate\Http\Response
     */
    public function update(MarketingExpenseRequest $request, MarketingExpense $marketingExpense)
    {
        Gate::authorize('update',$marketingExpense);
        $arr = $request->only('brand_id', 'user_id', 'm_flag_id', 'for_date', 'amount', 'for_day');
        $arr['request_amendments'] = 0;
        $arr['amendment_message'] = '';
        $marketingExpense->update($arr);
        if($request->invoice){
            $this->file->create([$request->invoice], 'marketing_expenses', $marketingExpense->id, 1);
        }
        return new MarketingExpenseResource($marketingExpense);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MarketingExpense  $marketingExpense
     * @return \Illuminate\Http\Response
     */
    public function destroy(MarketingExpense $marketingExpense)
    {
        Gate::authorize('delete',$marketingExpense);
        $marketingExpense->delete();
        return response()->json(null, 204);
    }
}
