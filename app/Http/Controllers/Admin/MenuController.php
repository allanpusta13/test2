<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\MenuItem\StoreMenuItemRequest;
use App\Http\Requests\MenuItem\ToggleAvailabilityRequest;
use App\Http\Requests\MenuItem\UpdateMenuItemRequest;
use App\Models\Category;
use App\Models\InventoryItem;
use App\Models\MenuItem;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
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
     * Display a listing of menu items (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'menu';

        return Inertia::render('Menu', $payload);
    }

    /**
     * API JSON listing of menu items with optional category and search filters.
     */
    public function list(Request $request): JsonResponse
    {
        $query = MenuItem::with('category')->orderBy('name');

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('is_available')) {
            $query->where('is_available', $request->boolean('is_available'));
        }

        $items = $query->get();

        return response()->json([
            'success' => true,
            'count' => $items->count(),
            'data' => $items,
        ]);
    }

    /**
     * Form metadata and options for creating a menu item (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        $categories = Category::where('is_active', true)->orderBy('sort_order')->get();
        $inventoryItems = InventoryItem::where('is_active', true)->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $categories,
                'inventory_items' => $inventoryItems,
                'standard_modifier_templates' => [
                    [
                        'name' => 'Size Selection',
                        'required' => true,
                        'min_selection' => 1,
                        'max_selection' => 1,
                        'options' => [
                            ['name' => 'Regular', 'extra_price' => 0.00],
                            ['name' => 'Large (+25%)', 'extra_price' => 3.50],
                        ],
                    ],
                    [
                        'name' => 'Cheese / Dairy',
                        'required' => false,
                        'min_selection' => 0,
                        'max_selection' => 3,
                        'options' => [
                            ['name' => 'Extra Mozzarella di Bufala', 'extra_price' => 2.50],
                            ['name' => 'Aged Parmigiano Reggiano', 'extra_price' => 2.00],
                            ['name' => 'Gorgonzola Dolce DOP', 'extra_price' => 2.50],
                        ],
                    ],
                    [
                        'name' => 'Preparation & Cooking',
                        'required' => false,
                        'min_selection' => 0,
                        'max_selection' => 1,
                        'options' => [
                            ['name' => 'Extra Crispy Wood-Fired Crust', 'extra_price' => 0.00],
                            ['name' => 'Light on Sauce', 'extra_price' => 0.00],
                            ['name' => 'Sauce on the Side', 'extra_price' => 0.00],
                        ],
                    ],
                ],
            ],
        ]);
    }

    /**
     * Store a newly created menu item (CRUD store).
     */
    public function store(StoreMenuItemRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (empty($validated['id'])) {
            $validated['id'] = 'item-' . Str::uuid()->toString();
        }

        $item = MenuItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu item created successfully',
            'data' => $item->fresh('category'),
        ], 201);
    }

    /**
     * Display the specified menu item (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $item = MenuItem::with('category')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    /**
     * Show form / metadata for editing the specified menu item (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $item = MenuItem::with('category')->findOrFail($id);
        $categories = Category::where('is_active', true)->orderBy('sort_order')->get();
        $inventoryItems = InventoryItem::where('is_active', true)->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => [
                'item' => $item,
                'categories' => $categories,
                'inventory_items' => $inventoryItems,
            ],
        ]);
    }

    /**
     * Update the specified menu item (CRUD update).
     */
    public function update(UpdateMenuItemRequest $request, string $id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);
        $item->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Menu item updated successfully',
            'data' => $item->fresh('category'),
        ]);
    }

    /**
     * Remove the specified menu item from storage (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu item deleted successfully',
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
     * Toggle availability flag of a menu item.
     */
    public function toggleAvailability(ToggleAvailabilityRequest $request, string $id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);
        $isAvailable = $request->has('is_available')
            ? $request->boolean('is_available')
            : !$item->is_available;

        $item->update(['is_available' => $isAvailable]);

        return response()->json([
            'success' => true,
            'message' => 'Dish availability updated',
            'data' => $item->fresh('category'),
        ]);
    }

    /**
     * List all categories.
     */
    public function categories(): JsonResponse
    {
        $categories = Category::withCount('menuItems')->orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Store new category.
     */
    public function storeCategory(StoreCategoryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (empty($validated['id'])) {
            $validated['id'] = 'cat-' . Str::uuid()->toString();
        }

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    /**
     * Update category.
     */
    public function updateCategory(UpdateCategoryRequest $request, string $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category->fresh(),
        ]);
    }

    /**
     * Delete category.
     */
    public function deleteCategory(string $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    /**
     * Reorder categories sort order.
     */
    public function reorderCategories(Request $request): JsonResponse
    {
        $request->validate([
            'category_ids' => ['required', 'array'],
            'category_ids.*' => ['string', 'exists:categories,id'],
        ]);

        $ids = $request->input('category_ids', []);

        DB::transaction(function () use ($ids): void {
            foreach ($ids as $index => $id) {
                Category::where('id', $id)->update(['sort_order' => $index + 1]);
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Categories reordered successfully',
            'data' => Category::orderBy('sort_order')->get(),
        ]);
    }
}
