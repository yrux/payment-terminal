<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FeedBack;
use App\Mail\FeedbackMail;
use Illuminate\Support\Facades\Mail;
class FeedBackController extends Controller
{
    public function feedback(){
        return view('feedback');
    }
    public function feedbackSubmit(Request $request){
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $email = $data['email'];
        $message = $data['message'];

        $chat = new FeedBack([
            'name' => $name,
            'email' => $email,
            'message' => $message,
        ]);
        $chat->save();
        Mail::to('yruxwork@gmail.com')->send(new FeedbackMail($chat));
        return response()->json(['success' => true]);
        // $currenturl = url()->current();

        // dd($currenturl);
        // return redirect()->back();
    }
}
