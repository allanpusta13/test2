<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Migration 000005 aborts if any role_id is NULL, so no backfill needed here
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role_id')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role_id')->nullable()->change();
        });
    }
};
