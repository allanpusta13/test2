<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\InventoryItem;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\User;

$models = [
    User::class,
    App\Models\Role::class,
    App\Models\Permission::class,
    Category::class,
    MenuItem::class,
    App\Models\Modifier::class,
    App\Models\ModifierOption::class,
    Order::class,
    OrderItem::class,
    App\Models\TaxRate::class,
    InventoryItem::class,
    App\Models\InventoryTransaction::class,
    Payment::class,
];

foreach ($models as $model) {
    $shortName = class_basename($model);

    test("{$shortName} uses string primary key", function () use ($model) {
        $instance = new $model();

        expect($instance->incrementing)->toBeFalse();
        expect($instance->getKeyType())->toBe('string');
    });
}
