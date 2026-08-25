<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed default system users
        User::firstOrCreate(
            ['email' => 'elena@artisanbistro.com'],
            [
                'id' => 'usr-1',
                'name' => 'Elena Rostova',
                'role' => User::ROLE_ADMIN,
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                'password' => bcrypt('password123'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'sophia@artisanbistro.com'],
            [
                'id' => 'usr-2',
                'name' => 'Sophia Rossi',
                'role' => User::ROLE_CASHIER,
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                'password' => bcrypt('password123'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'luigi@artisanbistro.com'],
            [
                'id' => 'usr-3',
                'name' => 'Luigi Vanni',
                'role' => User::ROLE_KITCHEN_STAFF,
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                'password' => bcrypt('password123'),
            ]
        );

        // Seed restaurant resources
        $this->call([
            CategorySeeder::class,
            MenuSeeder::class,
            InventorySeeder::class,
            OrderSeeder::class,
        ]);
    }
}
