<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
final class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'id' => 'role-'.Str::uuid()->toString(),
            'name' => fake()->unique()->word(),
            'is_system' => false,
        ];
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes): array => [
            'name' => Role::ROLE_ADMIN,
            'is_system' => true,
        ]);
    }

    public function cashier(): static
    {
        return $this->state(fn (array $attributes): array => [
            'name' => Role::ROLE_CASHIER,
            'is_system' => true,
        ]);
    }

    public function kitchenStaff(): static
    {
        return $this->state(fn (array $attributes): array => [
            'name' => Role::ROLE_KITCHEN_STAFF,
            'is_system' => true,
        ]);
    }
}
