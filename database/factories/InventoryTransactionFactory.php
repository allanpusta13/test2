<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\InventoryTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryTransaction>
 */
final class InventoryTransactionFactory extends Factory
{
    protected $model = InventoryTransaction::class;

    public function definition(): array
    {
        return [
            'id' => 'tx-'.Str::uuid()->toString(),
            'inventory_item_id' => null,
            'inventory_item_name' => fake()->word(),
            'quantity' => fake()->randomFloat(2, -10, 50),
            'type' => fake()->randomElement(['restock', 'prep_deduction', 'waste', 'audit_adjustment', 'cancellation_reversal']),
            'reference' => fake()->sentence(3),
            'notes' => null,
        ];
    }
}
