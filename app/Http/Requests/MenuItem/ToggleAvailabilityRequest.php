<?php

declare(strict_types=1);

namespace App\Http\Requests\MenuItem;

use Illuminate\Foundation\Http\FormRequest;

final class ToggleAvailabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'is_available' => ['required', 'boolean'],
        ];
    }
}
