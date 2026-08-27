<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Permission>
 */
final class PermissionFactory extends Factory
{
    protected $model = Permission::class;

    public function definition(): array
    {
        return [
            'id' => 'perm-'.Str::uuid()->toString(),
            'name' => fake()->unique()->slug(2, '.'),
            'description' => fake()->sentence(),
            'module' => fake()->word(),
        ];
    }
}
