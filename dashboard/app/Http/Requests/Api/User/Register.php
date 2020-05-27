<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Register extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::guest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'cnpj' => 'required|string|max:15',
            'phone' => 'required|string|max:12',
            'zipcode' => 'required|string|max:9',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'password' => 'required|string|max:255'
        ];
    }
}
