<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modifiers', function (Blueprint $table): void {
            $table->string('id')->primary();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('modifier_options', function (Blueprint $table): void {
            $table->string('id')->primary();
            $table->string('modifier_id');
            $table->string('name');
            $table->decimal('extra_price', 10, 2)->default(0);
            $table->timestamps();

            $table->foreign('modifier_id')->references('id')->on('modifiers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('modifier_options');
        Schema::dropIfExists('modifiers');
    }
};
