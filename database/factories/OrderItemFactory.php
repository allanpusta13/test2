<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
final class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        return [
            'id' => 'oi-'.Str::uuid()->toString(),
            'order_id' => Order::factory(),
            'menu_item_id' => null,
            'name' => fake()->words(2, true),
            'quantity' => fake()->numberBetween(1, 5),
            'unit_price' => fake()->randomFloat(2, 5, 50),
            'total_price' => fake()->randomFloat(2, 5, 200),
            'notes' => null,
            'selected_modifiers' => [],
        ];
    }
}
