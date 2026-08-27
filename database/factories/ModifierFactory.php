<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Modifier;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modifier>
 */
final class ModifierFactory extends Factory
{
    protected $model = Modifier::class;

    public function definition(): array
    {
        return [
            'id' => 'mod-'.Str::uuid()->toString(),
            'name' => fake()->unique()->word(),
        ];
    }
}
