<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateRestaurantSettingsRequest;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = RestaurantDataService::getSettings();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    public function update(UpdateRestaurantSettingsRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $currentSettings = RestaurantDataService::getSettings();
        $updatedSettings = array_merge($currentSettings, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Store settings updated successfully',
            'data' => $updatedSettings,
        ]);
    }
}
