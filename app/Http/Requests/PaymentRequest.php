<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
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
        return [
            'brand_id' =>'required|exists:brands,id',
            'amount' => 'required',
            'user_id' => 'required|exists:users,id',
            'customer_email' => 'required|max:255|email',
            'customer_name' => 'required|max:255',
            'payment_gateway' => 'required|exists:merchants,id'
        ];
    }
}
