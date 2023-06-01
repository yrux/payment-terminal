<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserSubmissionRequest;
use App\Http\Resources\UserSubmissionResource;
use App\Models\BrandFormSubmission;
use App\Models\UserSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Repositories\{ ListRepository, FileRepository };

class UserSubmissionController extends Controller
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
        $this->listRep->bindModel(UserSubmission::class);
    }
    public function index()
    {
        $query = $this->listRep->listFilteredQuery(['user_submissions.name', 'brands.name', 'email', 'brief_forms.name'])
        ->select('user_submissions.*', 'brands.name as brand_name', 'brief_forms.name as brief_forms_name')
        ->leftJoin('brands','user_submissions.brand_id','=','brands.id')
        ->leftJoin('brief_forms','user_submissions.brief_form_id','=','brief_forms.id');
        if(auth()->user()->role_id!=1){
            $query = $query->whereIn('brand_id', auth()->user()->brands->pluck('brand_id'));
        }
        if(isset($_GET['perpage'])&&intval($_GET['perpage'])>0){
            $query=$query->paginate($_GET['perpage']);
        }else{
            $query=$query->get();
        }
        return UserSubmissionResource::collection($query);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserSubmission  $userSubmission
     * @return \Illuminate\Http\Response
     */
    public function show(UserSubmission $userSubmission)
    {
        $userSubmission->load('brand','briefform');
        return new UserSubmissionResource($userSubmission);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserSubmission  $userSubmission
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserSubmission $userSubmission)
    {
        $userSubmission->delete();
        return response()->json(null, 204);
    }
    public function viewBrief(UserSubmission $userSubmission){   
        $userSubmission->load('brand','briefform');
        return view('user-submissions')->with(compact('userSubmission'));
    }
    public function viewQuery(BrandFormSubmission $brandFormSubmission){
        return view('query-submissions')->with(compact('brandFormSubmission'));
    }
}
