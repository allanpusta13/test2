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
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'sophia@artisanbistro.com'],
            [
                'id' => 'usr-2',
                'name' => 'Sophia Rossi',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'luigi@artisanbistro.com'],
            [
                'id' => 'usr-3',
                'name' => 'Luigi Vanni',
                'password' => bcrypt('password'),
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
