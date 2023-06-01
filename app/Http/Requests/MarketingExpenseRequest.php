<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarketingExpenseRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'm_flag_id' => 'required|exists:m_flags,id',
            'amount' => 'required',
            'for_day' => 'required|date',
        ];
    }
}
