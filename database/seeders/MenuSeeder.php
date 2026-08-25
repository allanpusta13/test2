<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\MenuItem;
use App\Services\RestaurantDataService;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $items = RestaurantDataService::getMenuItems();

        foreach ($items as $item) {
            MenuItem::updateOrCreate(
                ['id' => $item['id']],
                [
                    'category_id' => $item['category_id'],
                    'name' => $item['name'],
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'image' => $item['image'],
                    'is_available' => $item['is_available'],
                    'modifier_groups' => $item['modifier_groups'],
                    'recipe' => $item['recipe'],
                ]
            );
        }
    }
}
