<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use App\Services\SeedDataService;
use Illuminate\Database\Seeder;

final class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = SeedDataService::getCategories();

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['id' => $categoryData['id']],
                [
                    'name' => $categoryData['name'],
                    'type' => $categoryData['type'] ?? 'menu',
                    'icon' => $categoryData['icon'] ?? 'Utensils',
                    'sort_order' => $categoryData['sort_order'] ?? 0,
                    'is_active' => true,
                ]
            );
        }
    }
}
