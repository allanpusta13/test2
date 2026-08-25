<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['nullable', 'string', 'max:50', 'unique:users,id'],
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'role' => ['required', 'string', 'in:admin,cashier,kitchen_staff'],
            'avatar' => ['nullable', 'string', 'max:500'],
            'password' => ['nullable', 'string', 'min:6'],
        ];
    }
}
