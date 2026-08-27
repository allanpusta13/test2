<?php

declare(strict_types=1);

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;

final class StoreInventoryTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['nullable', 'string', 'max:50', 'unique:inventory_transactions,id'],
            'inventory_item_id' => ['required', 'string', 'exists:inventory_items,id'],
            'quantity' => ['required', 'numeric', 'not_in:0'],
            'type' => ['required', 'string', 'in:restock,prep_deduction,waste,audit_adjustment,cancellation_reversal'],
            'reference' => ['nullable', 'string', 'max:150'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }
}
