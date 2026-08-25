<?php

declare(strict_types=1);

namespace App\Http\Requests\MenuItem;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['nullable', 'string', 'max:50', 'unique:menu_items,id'],
            'category_id' => ['required', 'string', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'string', 'max:500'],
            'is_available' => ['nullable', 'boolean'],
            'modifier_groups' => ['nullable', 'array'],
            'modifier_groups.*.id' => ['nullable', 'string'],
            'modifier_groups.*.name' => ['required_with:modifier_groups', 'string'],
            'modifier_groups.*.required' => ['nullable', 'boolean'],
            'modifier_groups.*.min_selection' => ['nullable', 'integer', 'min:0'],
            'modifier_groups.*.max_selection' => ['nullable', 'integer', 'min:1'],
            'modifier_groups.*.options' => ['required_with:modifier_groups', 'array'],
            'modifier_groups.*.options.*.id' => ['nullable', 'string'],
            'modifier_groups.*.options.*.name' => ['required', 'string'],
            'modifier_groups.*.options.*.extra_price' => ['required', 'numeric', 'min:0'],
            'recipe' => ['nullable', 'array'],
            'recipe.*.inventory_item_id' => ['required_with:recipe', 'string', 'exists:inventory_items,id'],
            'recipe.*.quantity_used' => ['required_with:recipe', 'numeric', 'min:0.001'],
        ];
    }
}
