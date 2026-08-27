<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_item_inventory', function (Blueprint $table): void {
            $table->string('menu_item_id');
            $table->string('inventory_item_id');
            $table->decimal('quantity_used', 10, 4);
            $table->primary(['menu_item_id', 'inventory_item_id']);

            $table->foreign('menu_item_id')->references('id')->on('menu_items')->onDelete('cascade');
            $table->foreign('inventory_item_id')->references('id')->on('inventory_items')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_item_inventory');
    }
};
