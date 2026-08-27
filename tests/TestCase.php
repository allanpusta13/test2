<?php

namespace Tests;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Seed roles before creating user — FK constraint requires them to exist.
        Role::updateOrCreate(['name' => 'admin'], ['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
        Role::updateOrCreate(['name' => 'cashier'], ['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
        Role::updateOrCreate(['name' => 'kitchen_staff'], ['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);

        $this->actingAs(User::factory()->create([
            'name' => config('app.default_user.name'),
            'email' => config('app.default_user.email'),
            'password' => config('app.default_user.password'),
            'role_id' => 'role-admin',
        ]));

        $this->withoutVite();
    }
}
