<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
final class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'id' => 'ord-'.Str::uuid()->toString(),
            'order_number' => 'AB-'.random_int(1000, 9999),
            'status' => Order::STATUS_PENDING,
            'type' => Order::TYPE_DINE_IN,
            'table_number' => null,
            'customer_name' => 'Guest Diner',
            'customer_phone' => null,
            'notes' => null,
            'idempotency_key' => Str::uuid()->toString(),
            'tracking_token' => 'OT-'.mb_strtoupper(Str::random(6)),
            'subtotal' => 0,
            'tax_total' => 0,
            'total' => 0,
        ];
    }
}
