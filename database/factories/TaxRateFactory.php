<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\TaxRate;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaxRate>
 */
final class TaxRateFactory extends Factory
{
    protected $model = TaxRate::class;

    public function definition(): array
    {
        return [
            'id' => 'tax-'.Str::uuid()->toString(),
            'name' => fake()->unique()->word(),
            'rate' => fake()->randomFloat(2, 1, 25),
            'is_inclusive' => fake()->boolean(),
            'applies_to' => fake()->randomElement(['all', 'category']),
        ];
    }
}
