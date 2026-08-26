<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Services\SeedDataService;
use Illuminate\Database\Seeder;

final class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $orders = SeedDataService::getOrders();

        foreach ($orders as $orderData) {
            $order = Order::updateOrCreate(
                ['id' => $orderData['id']],
                [
                    'order_number' => $orderData['order_number'],
                    'status' => $orderData['status'],
                    'type' => $orderData['type'],
                    'table_number' => $orderData['table_number'] ?? null,
                    'customer_name' => $orderData['customer_name'],
                    'customer_phone' => $orderData['customer_phone'] ?? null,
                    'notes' => $orderData['notes'] ?? null,
                    'idempotency_key' => $orderData['idempotency_key'] ?? null,
                    'tracking_token' => $orderData['tracking_token'],
                    'subtotal' => $orderData['subtotal'],
                    'tax_total' => $orderData['tax_total'],
                    'total' => $orderData['total'],
                    'created_at' => $orderData['created_at'] ?? now(),
                    'updated_at' => $orderData['updated_at'] ?? now(),
                ]
            );

            // Seed items
            if (! empty($orderData['items'])) {
                foreach ($orderData['items'] as $item) {
                    OrderItem::updateOrCreate(
                        ['id' => $item['id']],
                        [
                            'order_id' => $order->id,
                            'menu_item_id' => $item['menu_item_id'] ?? null,
                            'name' => $item['name'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $item['unit_price'],
                            'total_price' => $item['total_price'],
                            'notes' => $item['notes'] ?? null,
                            'selected_modifiers' => $item['selected_modifiers'] ?? [],
                        ]
                    );
                }
            }

            // Seed payments
            if (! empty($orderData['payments'])) {
                foreach ($orderData['payments'] as $payment) {
                    Payment::updateOrCreate(
                        ['id' => $payment['id']],
                        [
                            'order_id' => $order->id,
                            'amount' => $payment['amount'],
                            'tendered' => $payment['tendered'],
                            'change_returned' => $payment['change_returned'] ?? 0,
                            'method' => $payment['method'] ?? 'cash',
                            'cashier_id' => $payment['cashier_id'] ?? null,
                            'cashier_name' => $payment['cashier_name'] ?? null,
                            'notes' => $payment['notes'] ?? null,
                            'created_at' => $payment['created_at'] ?? now(),
                        ]
                    );
                }
            }
        }
    }
}
