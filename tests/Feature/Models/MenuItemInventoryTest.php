<?php

declare(strict_types=1);

use App\Models\InventoryItem;
use App\Models\MenuItem;

test('menu item belongs to many inventory items', function () {
    $menuItem = MenuItem::factory()->create();
    $inventoryItem = InventoryItem::factory()->create();

    $menuItem->inventoryItems()->attach($inventoryItem->id, ['quantity_used' => 0.5]);

    expect($menuItem->inventoryItems)->toHaveCount(1);
    expect($menuItem->inventoryItems->first()->pivot->quantity_used)->toBe(0.5);
});

test('inventory item belongs to many menu items', function () {
    $inventoryItem = InventoryItem::factory()->create();
    $menuItem = MenuItem::factory()->create();

    $inventoryItem->menuItems()->attach($menuItem->id, ['quantity_used' => 1.5]);

    expect($inventoryItem->menuItems)->toHaveCount(1);
    expect($inventoryItem->menuItems->first()->pivot->quantity_used)->toBe(1.5);
});

test('menu item inventory pivot has cascade deletes', function () {
    $menuItem = MenuItem::factory()->create();
    $inventoryItem = InventoryItem::factory()->create();
    $menuItem->inventoryItems()->attach($inventoryItem->id, ['quantity_used' => 2]);

    $menuItem->delete();

    expect(DB::table('menu_item_inventory')->where('menu_item_id', $menuItem->id)->count())->toBe(0);
});
