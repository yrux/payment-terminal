<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = intval(optional($this->route('user'))->id);
        return [
            'name'=>'required|max:255',
            // 'phone'=>'required|max:255',
            'email'=>'required|max:255|email|unique:App\Models\User,email'.($id>0?(','.$id):''),
            'role_id'=>'required',
            'password'=>'sometimes|required|max:200',
            'image'=>'sometimes|image',
        ];
    }
}