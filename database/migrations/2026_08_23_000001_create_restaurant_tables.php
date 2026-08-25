<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('icon')->default('Utensils');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('menu_items', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('category_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            $table->boolean('is_available')->default(true);
            $table->json('modifier_groups')->nullable();
            $table->json('recipe')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });

        Schema::create('inventory_items', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('unit')->default('kg');
            $table->decimal('low_stock_threshold', 10, 2)->default(5);
            $table->string('category')->default('General');
            $table->decimal('cost_per_unit', 10, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('inventory_item_id');
            $table->string('inventory_item_name');
            $table->decimal('quantity', 10, 2);
            $table->string('type'); // restock, prep_deduction, waste, audit_adjustment, cancellation_reversal
            $table->string('reference')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('inventory_item_id')->references('id')->on('inventory_items')->onDelete('cascade');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('order_number')->unique();
            $table->string('status')->default('pending'); // pending, preparing, ready, completed, cancelled
            $table->string('type')->default('dine_in'); // dine_in, takeaway
            $table->string('table_number')->nullable();
            $table->string('customer_name')->default('Guest Diner');
            $table->string('customer_phone')->nullable();
            $table->text('notes')->nullable();
            $table->string('idempotency_key')->nullable()->unique();
            $table->string('tracking_token')->unique();
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('tax_total', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('order_id');
            $table->string('menu_item_id')->nullable();
            $table->string('name');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->text('notes')->nullable();
            $table->json('selected_modifiers')->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('order_id');
            $table->decimal('amount', 10, 2);
            $table->decimal('tendered', 10, 2);
            $table->decimal('change_returned', 10, 2)->default(0);
            $table->string('method')->default('cash');
            $table->string('cashier_id')->nullable();
            $table->string('cashier_name')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('inventory_transactions');
        Schema::dropIfExists('inventory_items');
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('categories');
    }
};
