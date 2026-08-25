<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderStatusRequest;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
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

class OrderController extends Controller
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
     * Display a listing of orders (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'orders';

        return Inertia::render('Orders', $payload);
    }

    /**
     * API JSON listing of orders with filters and pagination/search (CRUD list).
     */
    public function list(Request $request): JsonResponse
    {
        $query = Order::with(['items.menuItem', 'payments'])->orderByDesc('created_at');

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('table_number', 'like', "%{$search}%")
                  ->orWhere('tracking_token', 'like', "%{$search}%");
            });
        }

        $orders = $query->get();

        return response()->json([
            'success' => true,
            'count' => $orders->count(),
            'data' => $orders,
        ]);
    }

    /**
     * Form metadata and checkout defaults for creating a new order (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        $settings = RestaurantDataService::getSettings();

        return response()->json([
            'success' => true,
            'data' => [
                'tax_rate' => $settings['tax_rate'] ?? 0.08875,
                'available_statuses' => [
                    Order::STATUS_PENDING,
                    Order::STATUS_PREPARING,
                    Order::STATUS_READY,
                    Order::STATUS_COMPLETED,
                    Order::STATUS_CANCELLED,
                ],
                'available_types' => [
                    Order::TYPE_DINE_IN,
                    Order::TYPE_TAKEOUT,
                ],
                'next_order_number' => 'AB-' . random_int(1000, 9999),
            ],
        ]);
    }

    /**
     * Store a newly created order (CRUD store).
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
                'status' => $validated['status'] ?? Order::STATUS_PENDING,
                'type' => $validated['type'],
                'table_number' => $validated['table_number'] ?? null,
                'customer_name' => $validated['customer_name'] ?? 'Walk-In Guest',
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
            'message' => 'Order placed successfully',
            'data' => $order->load(['items', 'payments']),
        ], 201);
    }

    /**
     * Display the specified order (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem', 'payments'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Show form / metadata for editing the specified order (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem', 'payments'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'order' => $order,
                'available_statuses' => [
                    Order::STATUS_PENDING,
                    Order::STATUS_PREPARING,
                    Order::STATUS_READY,
                    Order::STATUS_COMPLETED,
                    Order::STATUS_CANCELLED,
                ],
            ],
        ]);
    }

    /**
     * Update the specified order (CRUD update).
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $order = Order::with(['items', 'payments'])->findOrFail($id);

        $oldStatus = $order->status;
        $newStatus = $request->input('status', $oldStatus);

        DB::transaction(function () use ($order, $oldStatus, $newStatus, $request): void {
            if ($newStatus === Order::STATUS_PREPARING && $oldStatus === Order::STATUS_PENDING) {
                $this->deductInventoryForOrder($order);
            }

            if ($newStatus === Order::STATUS_CANCELLED && in_array($oldStatus, [Order::STATUS_PREPARING, Order::STATUS_READY], true)) {
                $this->reverseInventoryForOrder($order);
            }

            $order->status = $newStatus;
            if ($request->filled('table_number')) {
                $order->table_number = $request->input('table_number');
            }
            if ($request->filled('customer_name')) {
                $order->customer_name = $request->input('customer_name');
            }
            if ($request->filled('notes')) {
                $order->notes = $request->input('notes');
            }
            $order->save();
        });

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => $order->fresh()->load(['items.menuItem', 'payments']),
        ]);
    }

    /**
     * Remove the specified order from storage (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $order = Order::with('items')->findOrFail($id);

        DB::transaction(function () use ($order): void {
            if (in_array($order->status, [Order::STATUS_PREPARING, Order::STATUS_READY], true)) {
                $this->reverseInventoryForOrder($order);
            }
            $order->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Order deleted successfully',
        ]);
    }

    /**
     * Delete alias.
     */
    public function delete(string $id): JsonResponse
    {
        return $this->destroy($id);
    }

    /**
     * Quick status update endpoint.
     */
    public function updateStatus(UpdateOrderStatusRequest $request, string $id): JsonResponse
    {
        return $this->update($request, $id);
    }

    protected function deductInventoryForOrder(Order $order): void
    {
        foreach ($order->items as $orderItem) {
            $menuItem = $orderItem->menuItem ?? MenuItem::find($orderItem->menu_item_id);
            if (!$menuItem || empty($menuItem->recipe) || !is_array($menuItem->recipe)) {
                continue;
            }

            $multiplier = max(1, (int) $orderItem->quantity);

            foreach ($menuItem->recipe as $ingredient) {
                $invItemId = $ingredient['inventory_item_id'] ?? null;
                $usedQty = (float) ($ingredient['quantity_used'] ?? 0) * $multiplier;

                if ($invItemId && $usedQty > 0) {
                    $invItem = InventoryItem::find($invItemId);
                    InventoryTransaction::create([
                        'id' => 'tx-' . Str::uuid()->toString(),
                        'inventory_item_id' => $invItemId,
                        'inventory_item_name' => $invItem ? $invItem->name : 'Ingredient',
                        'quantity' => -$usedQty,
                        'type' => InventoryTransaction::TYPE_PREP_DEDUCTION,
                        'reference' => "Order #{$order->order_number}",
                        'notes' => "Auto recipe BOM deduction for {$multiplier}x {$orderItem->name}",
                    ]);
                }
            }
        }
    }

    protected function reverseInventoryForOrder(Order $order): void
    {
        foreach ($order->items as $orderItem) {
            $menuItem = $orderItem->menuItem ?? MenuItem::find($orderItem->menu_item_id);
            if (!$menuItem || empty($menuItem->recipe) || !is_array($menuItem->recipe)) {
                continue;
            }

            $multiplier = max(1, (int) $orderItem->quantity);

            foreach ($menuItem->recipe as $ingredient) {
                $invItemId = $ingredient['inventory_item_id'] ?? null;
                $usedQty = (float) ($ingredient['quantity_used'] ?? 0) * $multiplier;

                if ($invItemId && $usedQty > 0) {
                    $invItem = InventoryItem::find($invItemId);
                    InventoryTransaction::create([
                        'id' => 'tx-' . Str::uuid()->toString(),
                        'inventory_item_id' => $invItemId,
                        'inventory_item_name' => $invItem ? $invItem->name : 'Ingredient',
                        'quantity' => $usedQty,
                        'type' => InventoryTransaction::TYPE_CANCELLATION_REVERSAL,
                        'reference' => "Cancelled #{$order->order_number} Reversal",
                        'notes' => "Restored ingredients from cancelled order",
                    ]);
                }
            }
        }
    }
}
