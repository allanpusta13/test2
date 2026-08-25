<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class TrackerController extends Controller
{
    protected function getEffectiveLocale(Request $request): string
    {
        $locale = $request->get('locale') ?? Session::get('locale') ?? config('app.locale', 'en');
        if (!in_array($locale, ['en', 'it'], true)) {
            $locale = 'en';
        }
        App::setLocale($locale);
        return $locale;
    }

    public function index(Request $request, ?string $token = null): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['token'] = $token;
        $payload['currentSurface'] = 'public_tracker';

        return Inertia::render('Tracker', $payload);
    }

    public function track(string $token): JsonResponse
    {
        $order = Order::with(['items.menuItem', 'payments'])
            ->where('tracking_token', $token)
            ->orWhere('order_number', $token)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found for the given tracking token or order number',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }
}
