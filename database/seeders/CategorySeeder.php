<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use App\Services\RestaurantDataService;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = RestaurantDataService::getCategories();

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['id' => $categoryData['id']],
                [
                    'name' => $categoryData['name'],
                    'icon' => $categoryData['icon'] ?? 'Utensils',
                    'sort_order' => $categoryData['sort_order'] ?? 0,
                    'is_active' => true,
                ]
            );
        }
    }
}
