<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Modifier;
use App\Models\ModifierOption;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ModifierOption>
 */
final class ModifierOptionFactory extends Factory
{
    protected $model = ModifierOption::class;

    public function definition(): array
    {
        return [
            'id' => 'mopt-'.Str::uuid()->toString(),
            'modifier_id' => Modifier::factory(),
            'name' => fake()->word(),
            'extra_price' => fake()->randomFloat(2, 0, 5),
        ];
    }
}
