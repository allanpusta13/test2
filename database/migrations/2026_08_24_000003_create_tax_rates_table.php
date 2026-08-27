<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tax_rates', function (Blueprint $table): void {
            $table->string('id')->primary();
            $table->string('name');
            $table->decimal('rate', 5, 2);
            $table->boolean('is_inclusive')->default(false);
            $table->string('applies_to')->default('all');
            $table->string('category_id')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tax_rates');
    }
};
