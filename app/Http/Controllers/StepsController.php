<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Step2Validation;
use App\Models\{UserSubmission, Brand};
use App\Mail\BriefSubmitted;
use Illuminate\Support\Facades\Mail;
class StepsController extends Controller
{
    public function step2(Step2Validation $request){
        return response()->json([
            'status' => true
        ]);
    }
    public function step3(Request $request){
        $arr = [
            'brand_id' => $request->brand_id,
            'brief_form_id' => $request->form_id,
            'name' => $request->form2['name'],
            'email' => $request->form2['email'],
            'phone' => $request->form2['phone'],
            'name_to_appear' => $request->form2['name_to_appear'],
            'competitors' => $request->form2['competitors'],
            'industry' => $request->form2['industry'],
            'brief_description' => $request->form2['brief_description'],
            'formData' => json_encode($request->dynamicForm)
        ];
        $userSubmission = UserSubmission::create($arr);
        $brand = Brand::find($request->brand_id);
        foreach($brand->brief_notification_emails_array as $email){
            if($email!=''){
                Mail::to($email)->send(new BriefSubmitted($userSubmission));
            }
        }
        return response()->json([
            'status' => true,
            'notified_to' => $brand->brief_notification_emails_array,
        ]);
    }
}
