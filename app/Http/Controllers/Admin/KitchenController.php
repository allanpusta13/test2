<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\UpdateOrderStatusRequest;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\MenuItem;
use App\Models\Order;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class KitchenController extends Controller
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
     * Display Kitchen Display System (KDS) Screen (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'kitchen';

        return Inertia::render('Kitchen', $payload);
    }

    /**
     * API JSON listing of active kitchen tickets (CRUD list).
     */
    public function list(Request $request): JsonResponse
    {
        $activeOrders = Order::with(['items.menuItem', 'payments'])
            ->whereIn('status', [Order::STATUS_PENDING, Order::STATUS_PREPARING, Order::STATUS_READY])
            ->orderByRaw("CASE 
                WHEN status = 'pending' THEN 1 
                WHEN status = 'preparing' THEN 2 
                WHEN status = 'ready' THEN 3 
                ELSE 4 
            END")
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'count' => $activeOrders->count(),
            'data' => $activeOrders,
        ]);
    }

    /**
     * Alias for list.
     */
    public function feed(Request $request): JsonResponse
    {
        return $this->list($request);
    }

    /**
     * Display a specific kitchen ticket (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Show ticket details for editing/preparation notes (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Update kitchen ticket status or preparation notes (CRUD update).
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem'])->findOrFail($id);
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
            if ($request->filled('notes')) {
                $order->notes = $request->input('notes');
            }
            $order->save();
        });

        return response()->json([
            'success' => true,
            'message' => "Kitchen ticket status updated to {$newStatus}",
            'data' => $order->fresh()->load(['items.menuItem', 'payments']),
        ]);
    }

    /**
     * Delete/archive ticket from kitchen display (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => Order::STATUS_COMPLETED]);

        return response()->json([
            'success' => true,
            'message' => 'Kitchen ticket marked completed',
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
     * Bump ticket to next stage (pending -> preparing -> ready -> completed).
     */
    public function bump(Request $request, string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem'])->findOrFail($id);
        $oldStatus = $order->status;

        $nextStatusMap = [
            Order::STATUS_PENDING => Order::STATUS_PREPARING,
            Order::STATUS_PREPARING => Order::STATUS_READY,
            Order::STATUS_READY => Order::STATUS_COMPLETED,
        ];

        $newStatus = $request->input('status') ?? ($nextStatusMap[$oldStatus] ?? $oldStatus);

        DB::transaction(function () use ($order, $oldStatus, $newStatus, $request): void {
            if ($newStatus === Order::STATUS_PREPARING && $oldStatus === Order::STATUS_PENDING) {
                $this->deductInventoryForOrder($order);
            }

            if ($newStatus === Order::STATUS_CANCELLED && in_array($oldStatus, [Order::STATUS_PREPARING, Order::STATUS_READY], true)) {
                $this->reverseInventoryForOrder($order);
            }

            $order->status = $newStatus;
            if ($request->filled('notes')) {
                $order->notes = $request->input('notes');
            }
            $order->save();
        });

        return response()->json([
            'success' => true,
            'message' => "Order bumped from {$oldStatus} to {$newStatus}",
            'data' => $order->fresh()->load(['items.menuItem', 'payments']),
        ]);
    }

    /**
     * Update status alias.
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
                        'reference' => "KDS Bump #{$order->order_number}",
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
