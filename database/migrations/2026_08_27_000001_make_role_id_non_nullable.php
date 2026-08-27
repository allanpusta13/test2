<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Backfill any existing null role_id values with role-cashier (safe default)
        DB::table('users')
            ->whereNull('role_id')
            ->update(['role_id' => 'role-cashier']);

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
