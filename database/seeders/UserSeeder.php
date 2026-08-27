<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

final class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'id' => 'usr-1',
                'name' => 'Elena Rostova',
                'email' => 'elena@artisanbistro.com',
                'role_id' => 'role-admin',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
            [
                'id' => 'usr-2',
                'name' => 'Sophia Rossi',
                'email' => 'sophia@artisanbistro.com',
                'role_id' => 'role-cashier',
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
            [
                'id' => 'usr-3',
                'name' => 'Luigi Vanni',
                'email' => 'luigi@artisanbistro.com',
                'role_id' => 'role-kitchen-staff',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
            [
                'id' => 'usr-4',
                'name' => 'Marco Rossi',
                'email' => 'marco@artisanbistro.com',
                'role_id' => 'role-admin',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
            [
                'id' => 'usr-5',
                'name' => 'Giulia Bianchi',
                'email' => 'giulia@artisanbistro.com',
                'role_id' => 'role-cashier',
                'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
            [
                'id' => 'usr-6',
                'name' => 'Matteo Moretti',
                'email' => 'matteo@artisanbistro.com',
                'role_id' => 'role-kitchen-staff',
                'avatar' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
                'password' => Hash::make('password123'),
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
