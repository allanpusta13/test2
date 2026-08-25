<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
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
     * Display a listing of users/staff (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'users';

        return Inertia::render('Users', $payload);
    }

    /**
     * API JSON listing of users (CRUD list).
     */
    public function list(Request $request): JsonResponse
    {
        $query = User::orderBy('name');

        if ($role = $request->query('role')) {
            $query->where('role', $role);
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->get();

        return response()->json([
            'success' => true,
            'count' => $users->count(),
            'data' => $users,
        ]);
    }

    /**
     * Form metadata and available roles for creating a staff member (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'roles' => [
                    ['id' => User::ROLE_ADMIN, 'name' => 'Store Administrator', 'description' => 'Full access to all operations, menu, stock, reports, and team'],
                    ['id' => User::ROLE_CASHIER, 'name' => 'Front Desk Cashier', 'description' => 'Create orders, collect cash payments, print receipts'],
                    ['id' => User::ROLE_KITCHEN_STAFF, 'name' => 'Line Cook / Kitchen Staff', 'description' => 'View KDS tickets, bump orders, review recipes and prep'],
                ],
            ],
        ]);
    }

    /**
     * Store a newly created staff user (CRUD store).
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (empty($validated['id'])) {
            $validated['id'] = 'usr-' . Str::uuid()->toString();
        }

        if (empty($validated['password'])) {
            $validated['password'] = 'password123';
        }

        $user = User::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Staff member account created successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Display the specified staff user (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Show form / metadata for editing the specified staff user (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'roles' => [
                    ['id' => User::ROLE_ADMIN, 'name' => 'Store Administrator'],
                    ['id' => User::ROLE_CASHIER, 'name' => 'Front Desk Cashier'],
                    ['id' => User::ROLE_KITCHEN_STAFF, 'name' => 'Line Cook / Kitchen Staff'],
                ],
            ],
        ]);
    }

    /**
     * Update the specified staff user (CRUD update).
     */
    public function update(UpdateUserRequest $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $validated = $request->validated();

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Staff member profile updated successfully',
            'data' => $user->fresh(),
        ]);
    }

    /**
     * Remove the specified staff user (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if (User::where('role', User::ROLE_ADMIN)->count() <= 1 && $user->role === User::ROLE_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete the only remaining Store Administrator.',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Staff member deleted',
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
     * Role-Based Access Control (RBAC) permissions matrix.
     */
    public function rolesMatrix(): JsonResponse
    {
        $permissions = RestaurantDataService::getRolePermissions();

        return response()->json([
            'success' => true,
            'data' => $permissions,
        ]);
    }
}
