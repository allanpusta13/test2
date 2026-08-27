<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\InventoryItem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryItem>
 */
final class InventoryItemFactory extends Factory
{
    protected $model = InventoryItem::class;

    public function definition(): array
    {
        return [
            'id' => 'inv-'.Str::uuid()->toString(),
            'name' => fake()->unique()->word(),
            'unit' => fake()->randomElement(['kg', 'g', 'L', 'ml', 'pcs', 'oz']),
            'low_stock_threshold' => fake()->randomFloat(2, 1, 10),
            'category' => fake()->randomElement(['Produce', 'Protein', 'Dairy', 'Pantry', 'Beverages']),
            'cost_per_unit' => fake()->randomFloat(2, 0.5, 20),
        ];
    }
}
