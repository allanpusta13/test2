<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
final class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'id' => 'pay-'.Str::uuid()->toString(),
            'order_id' => Order::factory(),
            'amount' => fake()->randomFloat(2, 5, 100),
            'tendered' => fake()->randomFloat(2, 10, 150),
            'change_returned' => 0,
            'method' => 'cash',
            'cashier_id' => null,
            'cashier_name' => fake()->name(),
            'notes' => null,
        ];
    }
}
