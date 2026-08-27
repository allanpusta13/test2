<?php

declare(strict_types=1);

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

final class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['nullable', 'string', 'max:50', 'unique:payments,id'],
            'order_id' => ['required', 'string', 'exists:orders,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'tendered' => ['required', 'numeric', 'gte:amount'],
            'change_returned' => ['nullable', 'numeric', 'min:0'],
            'method' => ['nullable', 'string', 'in:cash'],
            'cashier_id' => ['nullable', 'string', 'max:50'],
            'cashier_name' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'tendered.gte' => 'Tendered cash amount must be greater than or equal to the amount being paid.',
            'method.in' => 'This establishment strictly processes cash register payments.',
        ];
    }
}
