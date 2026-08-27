<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role_id')->nullable()->after('password');
        });

        // Map existing string role values to role IDs
        $roleMap = [
            'admin' => 'role-admin',
            'cashier' => 'role-cashier',
            'kitchen_staff' => 'role-kitchen-staff',
        ];

        foreach ($roleMap as $roleName => $roleId) {
            DB::table('users')
                ->where('role', $roleName)
                ->update(['role_id' => $roleId]);
        }

        // Abort if any users have unmapped roles — these must be resolved manually
        $unmappedUsers = DB::table('users')
            ->whereNull('role_id')
            ->pluck('id');

        if ($unmappedUsers->isNotEmpty()) {
            abort(
                500,
                'Migration aborted: '.$unmappedUsers->count().' user(s) have unmapped roles and no role_id assigned. '
                .'User IDs: '.$unmappedUsers->implode(', ').'. '
                .'Resolve manually before migrating.'
            );
        }

        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role')->default('cashier')->after('password');
        });

        $roleMap = [
            'role-admin' => 'admin',
            'role-cashier' => 'cashier',
            'role-kitchen-staff' => 'kitchen_staff',
        ];

        foreach ($roleMap as $roleId => $roleName) {
            DB::table('users')
                ->where('role_id', $roleId)
                ->update(['role' => $roleName]);
        }

        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn('role_id');
        });
    }
};
