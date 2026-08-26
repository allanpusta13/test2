<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Services\SeedDataService;
use Illuminate\Database\Seeder;

final class InventorySeeder extends Seeder
{
    public function run(): void
    {
        $items = SeedDataService::getInventoryItems();
        foreach ($items as $item) {
            InventoryItem::updateOrCreate(
                ['id' => $item['id']],
                [
                    'name' => $item['name'],
                    'unit' => $item['unit'],
                    'low_stock_threshold' => $item['low_stock_threshold'],
                    'category' => $item['category'],
                    'cost_per_unit' => $item['cost_per_unit'] ?? null,
                ]
            );
        }

        $transactions = SeedDataService::getTransactions();
        foreach ($transactions as $tx) {
            InventoryTransaction::updateOrCreate(
                ['id' => $tx['id']],
                [
                    'inventory_item_id' => $tx['inventory_item_id'],
                    'inventory_item_name' => $tx['inventory_item_name'],
                    'quantity' => $tx['quantity'],
                    'type' => $tx['type'],
                    'reference' => $tx['reference'],
                    'notes' => $tx['notes'] ?? null,
                    'created_at' => $tx['created_at'] ?? now(),
                ]
            );
        }
    }
}
