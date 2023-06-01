<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, UserVerify};
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Resources\UserResource;
use App\Http\Requests\{ProfileRequest, RegisterRequest};
use Mail;
use App\Repositories\{FileRepository};

class ApiAuthController extends Controller
{
    protected $file;
    public function __construct(FileRepository $file)
    {
        $this->file = $file;
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if ($user->is_email_verified == 1) {
                if (Hash::check($request->password, $user->password)) {
                    $token = $user->createToken('Seatow Token Grant')->accessToken;
                    $response = ['token' => $token, 'user' => $user];
                    return response($response, 200);
                } else {
                    $response = ["message" => "Password mismatch"];
                    return response($response, 422);
                }
            } else {
                if (Hash::check($request->password, $user->password)) {
                    $token = $user->createToken('Seatow Token Grant')->accessToken;
                    $response = ['token' => $token, 'user' => $user];
                    return response($response, 200);
                }
                $response = ["message" => "Password doesn't match"];
                return response($response, 422);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 422);
        }
    }

    public function logout(Request $request){
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }

    public function updateprofile(ProfileRequest $request){
        $arr = [
            'name' => $request->name,
            'email' => $request->email,
        ];
        if (isset($request->password)) {
            if (strlen($request->password) < 60) {
                $arr['password'] = Hash::make($request->password);
            }
        }
        $data = User::where('id', $request->user()->id)->update($arr);
        if($request->file){
            $this->file->create([$request->file], 'users', $request->user()->id, 1);
        }
        return new UserResource(User::find($request->user()->id));
    }
}
