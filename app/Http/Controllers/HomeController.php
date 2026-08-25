<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Order\StoreOrderRequest;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
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

    /**
     * Display public customer digital menu (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'public_menu';

        return Inertia::render('Index', $payload);
    }

    /**
     * API JSON Bootstrap Payload (All restaurant content, menu, settings, categories, inventory, translations from backend).
     */
    public function bootstrap(Request $request): JsonResponse
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);

        return response()->json($payload);
    }

    /**
     * API JSON listing of active menu categories and available dishes (CRUD list).
     */
    public function list(Request $request): JsonResponse
    {
        $categories = Category::with(['menuItems' => function ($q) {
            $q->where('is_available', true);
        }])
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $categories,
            ],
        ]);
    }

    /**
     * Categories list with dish counts.
     */
    public function categories(): JsonResponse
    {
        $categories = Category::withCount('menuItems')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Display the specified dish details (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $dish = MenuItem::with('category')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $dish,
        ]);
    }

    /**
     * Legacy alias for show.
     */
    public function dish(string $id): JsonResponse
    {
        return $this->show($id);
    }

    /**
     * Provide checkout defaults for customer ordering (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        $settings = RestaurantDataService::getSettings();

        return response()->json([
            'success' => true,
            'data' => [
                'tax_rate' => $settings['tax_rate'] ?? 0.08875,
                'available_types' => [Order::TYPE_DINE_IN, Order::TYPE_TAKEOUT],
            ],
        ]);
    }

    /**
     * Place a new customer order (CRUD store).
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (!empty($validated['idempotency_key'])) {
            $existing = Order::with(['items', 'payments'])
                ->where('idempotency_key', $validated['idempotency_key'])
                ->first();

            if ($existing) {
                return response()->json([
                    'success' => true,
                    'message' => 'Order retrieved via idempotency key',
                    'data' => $existing,
                ]);
            }
        }

        $order = DB::transaction(function () use ($validated): Order {
            $order = Order::create([
                'id' => $validated['id'] ?? ('ord-' . Str::uuid()->toString()),
                'order_number' => $validated['order_number'] ?? ('AB-' . random_int(1000, 9999)),
                'status' => Order::STATUS_PENDING,
                'type' => $validated['type'],
                'table_number' => $validated['table_number'] ?? null,
                'customer_name' => $validated['customer_name'] ?? 'Guest Diner',
                'customer_phone' => $validated['customer_phone'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'idempotency_key' => $validated['idempotency_key'] ?? null,
                'tracking_token' => 'OT-' . strtoupper(Str::random(6)),
                'subtotal' => $validated['subtotal'],
                'tax_total' => $validated['tax_total'],
                'total' => $validated['total'],
            ]);

            foreach ($validated['items'] as $itemData) {
                OrderItem::create([
                    'id' => 'oi-' . Str::uuid()->toString(),
                    'order_id' => $order->id,
                    'menu_item_id' => $itemData['menu_item_id'] ?? null,
                    'name' => $itemData['name'],
                    'quantity' => (int) $itemData['quantity'],
                    'unit_price' => (float) $itemData['unit_price'],
                    'total_price' => (float) $itemData['total_price'],
                    'notes' => $itemData['notes'] ?? null,
                    'selected_modifiers' => $itemData['selected_modifiers'] ?? [],
                ]);
            }

            return $order;
        });

        return response()->json([
            'success' => true,
            'message' => 'Order submitted successfully. Please proceed to the cashier counter to pay.',
            'data' => $order->load(['items', 'payments']),
        ], 201);
    }

    /**
     * Alias for store.
     */
    public function order(StoreOrderRequest $request): JsonResponse
    {
        return $this->store($request);
    }
}
