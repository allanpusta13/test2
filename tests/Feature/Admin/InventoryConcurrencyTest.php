<?php

declare(strict_types=1);

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);
});

test('concurrent inventory deductions use database atomicity', function () {
    if (! function_exists('pcntl_fork')) {
        $this->markTestSkipped('pcntl_fork not available');
    }

    $item = InventoryItem::create([
        'id' => 'inv-flour',
        'name' => 'All-Purpose Flour',
        'category' => 'Dry Goods',
        'unit' => 'kg',
        'unit_cost' => 0.80,
        'current_stock' => 10.0,
        'par_level' => 50.0,
        'supplier' => 'Sysco',
        'reorder_point' => 20.0,
    ]);

    InventoryTransaction::create([
        'id' => 'tx-initial',
        'inventory_item_id' => 'inv-flour',
        'quantity' => 10.0,
        'type' => 'restock',
        'reference' => 'Initial Stock',
        'notes' => '',
    ]);

    $pid1 = pcntl_fork();
    if ($pid1 === 0) {
        DB::table('inventory_transactions')->insert([
            'id' => 'tx-p1-'.getmypid(),
            'inventory_item_id' => $item->id,
            'quantity' => -8.0,
            'type' => 'deduction',
            'reference' => 'Order 1',
            'notes' => '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        exit(0);
    }

    $pid2 = pcntl_fork();
    if ($pid2 === 0) {
        DB::table('inventory_transactions')->insert([
            'id' => 'tx-p2-'.getmypid(),
            'inventory_item_id' => $item->id,
            'quantity' => -5.0,
            'type' => 'deduction',
            'reference' => 'Order 2',
            'notes' => '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        exit(0);
    }

    pcntl_waitpid($pid1, $status1);
    pcntl_waitpid($pid2, $status2);

    $totalStock = InventoryTransaction::where('inventory_item_id', $item->id)->sum('quantity');

    expect($totalStock)->toBe(-3.0);
});

test('stock deduction validation prevents overselling', function () {
    $item = InventoryItem::create([
        'id' => 'inv-milk',
        'name' => 'Whole Milk',
        'category' => 'Dairy',
        'unit' => 'liters',
        'unit_cost' => 1.20,
        'current_stock' => 5.0,
        'par_level' => 20.0,
        'supplier' => 'Local Farm',
        'reorder_point' => 10.0,
    ]);

    InventoryTransaction::create([
        'id' => 'tx-milk-initial',
        'inventory_item_id' => 'inv-milk',
        'quantity' => 5.0,
        'type' => 'restock',
        'reference' => 'Initial',
        'notes' => '',
    ]);

    $admin = User::factory()->create(['role_id' => 'role-admin']);

    $this->actingAs($admin)->post('/inventory/transactions', [
        'inventory_item_id' => 'inv-milk',
        'quantity' => -10.0,
        'type' => 'deduction',
        'reference' => 'Over-order',
        'notes' => '',
    ])->assertSessionHasErrors();

    $totalStock = InventoryTransaction::where('inventory_item_id', 'inv-milk')->sum('quantity');
    expect((float) $totalStock)->toBe(5.0);
});
