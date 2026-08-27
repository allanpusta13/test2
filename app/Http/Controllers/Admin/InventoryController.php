<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\StoreInventoryItemRequest;
use App\Http\Requests\Inventory\StoreInventoryTransactionRequest;
use App\Http\Requests\Inventory\UpdateInventoryItemRequest;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

final class InventoryController extends Controller
{
    /**
     * Display a listing of inventory items (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'inventory';

        return Inertia::render('Inventory', $payload);
    }

    /**
     * API JSON listing of inventory items with search and low-stock filter.
     */
    public function list(Request $request): JsonResponse
    {
        $query = InventoryItem::with(['transactions' => function ($q) {
            $q->latest()->limit(5);
        }])->orderBy('name');

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $items = $query->get();

        if ($request->boolean('low_stock_only')) {
            $items = $items->filter(fn (InventoryItem $item) => $item->is_low_stock)->values();
        }

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * Alias for list().
     */
    public function items(Request $request): JsonResponse
    {
        return $this->list($request);
    }

    /**
     * Form metadata and units for creating a new inventory item (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'categories' => ['Pantry', 'Dairy', 'Produce', 'Meat & Seafood', 'Bakery', 'Beverages', 'Packaging'],
                'units' => ['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'bottles', 'cans', 'portions', 'units'],
            ],
        ]);
    }

    /**
     * Store a newly created inventory item (CRUD store).
     */
    public function store(StoreInventoryItemRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $initialStock = (float) ($validated['initial_stock'] ?? 0);
        unset($validated['initial_stock']);

        if (empty($validated['id'])) {
            $validated['id'] = 'inv-'.Str::uuid()->toString();
        }

        $item = DB::transaction(function () use ($validated, $initialStock): InventoryItem {
            $item = InventoryItem::create($validated);

            if ($initialStock > 0) {
                InventoryTransaction::create([
                    'id' => 'tx-'.Str::uuid()->toString(),
                    'inventory_item_id' => $item->id,
                    'inventory_item_name' => $item->name,
                    'quantity' => $initialStock,
                    'type' => InventoryTransaction::TYPE_RESTOCK,
                    'reference' => 'Initial Stock Opening',
                    'notes' => 'Opening balance when item registered',
                ]);
            }

            return $item;
        });

        return response()->json([
            'success' => true,
            'message' => 'Inventory ingredient registered successfully',
            'data' => $item->fresh(['transactions']),
        ], 201);
    }

    /**
     * Alias for store.
     */
    public function storeItem(StoreInventoryItemRequest $request): JsonResponse
    {
        return $this->store($request);
    }

    /**
     * Display the specified inventory item with transaction history (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $item = InventoryItem::with(['transactions' => function ($q) {
            $q->latest();
        }])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    /**
     * Legacy alias for show.
     */
    public function showItem(string $id): JsonResponse
    {
        return $this->show($id);
    }

    /**
     * Show form / metadata for editing the specified inventory item (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $item = InventoryItem::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'item' => $item,
                'categories' => ['Pantry', 'Dairy', 'Produce', 'Meat & Seafood', 'Bakery', 'Beverages', 'Packaging'],
                'units' => ['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'bottles', 'cans', 'portions', 'units'],
            ],
        ]);
    }

    /**
     * Update the specified inventory item (CRUD update).
     */
    public function update(UpdateInventoryItemRequest $request, string $id): JsonResponse
    {
        $item = InventoryItem::findOrFail($id);
        $item->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Inventory ingredient updated successfully',
            'data' => $item->fresh(),
        ]);
    }

    /**
     * Legacy alias for update.
     */
    public function updateItem(UpdateInventoryItemRequest $request, string $id): JsonResponse
    {
        return $this->update($request, $id);
    }

    /**
     * Remove the specified inventory item from storage (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $item = InventoryItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inventory item deleted',
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
     * Legacy alias for delete.
     */
    public function deleteItem(string $id): JsonResponse
    {
        return $this->destroy($id);
    }

    /**
     * List transaction ledger.
     */
    public function transactions(Request $request): JsonResponse
    {
        $query = InventoryTransaction::with('inventoryItem')->orderByDesc('created_at');

        if ($itemId = $request->query('inventory_item_id')) {
            $query->where('inventory_item_id', $itemId);
        }

        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Record a stock transaction (restock, waste, adjustment).
     */
    public function recordTransaction(StoreInventoryTransactionRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $item = InventoryItem::findOrFail($validated['inventory_item_id']);

        if (empty($validated['id'])) {
            $validated['id'] = 'tx-'.Str::uuid()->toString();
        }

        $validated['inventory_item_name'] = $item->name;

        $qty = abs((float) $validated['quantity']);
        if (in_array($validated['type'], [InventoryTransaction::TYPE_WASTE, InventoryTransaction::TYPE_PREP_DEDUCTION], true)) {
            $validated['quantity'] = -$qty;
        } elseif ($validated['type'] === InventoryTransaction::TYPE_RESTOCK) {
            $validated['quantity'] = $qty;
        }

        $transaction = InventoryTransaction::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Inventory transaction recorded successfully',
            'data' => [
                'transaction' => $transaction,
                'item' => $item->fresh(),
                'new_derived_stock' => $item->fresh()->derived_stock,
            ],
        ], 201);
    }

    protected function getEffectiveLocale(Request $request): string
    {
        $locale = $request->get('locale') ?? Session::get('locale') ?? config('app.locale', 'en');
        if (! in_array($locale, ['en', 'it'], true)) {
            $locale = 'en';
        }
        App::setLocale($locale);

        return $locale;
    }
}
