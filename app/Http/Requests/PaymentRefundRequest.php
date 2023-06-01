<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRefundRequest extends FormRequest
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
            'brand_id' => 'required',
            'user_id' => 'required',
            'merchant_id' => 'required',
            'amount' => 'required',
            'refund_type' => 'required',
            'refund_id' => 'required',
            'refund_date' => 'required|date',
        ];
    }
}
