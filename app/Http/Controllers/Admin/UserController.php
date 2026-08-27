<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

final class UserController extends Controller
{
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
        $query = User::with('associatedRole')->orderBy('name');

        if ($role = $request->query('role')) {
            $query->whereHas('associatedRole', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }

        if ($search = $request->query('search')) {
            $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $search);
            $query->where(function ($q) use ($escaped) {
                $q->where('name', 'like', "%{$escaped}%")
                    ->orWhere('email', 'like', "%{$escaped}%");
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
                'roles' => Role::all()->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ]),
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
            $validated['id'] = 'usr-'.Str::uuid()->toString();
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
        $user = User::with('associatedRole')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'roles' => Role::all()->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ]),
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

        if ($id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete your own active user account.',
            ], 422);
        }

        if (User::whereHas('associatedRole', fn ($q) => $q->where('name', User::ROLE_ADMIN))->count() <= 1 && $user->role === User::ROLE_ADMIN) {
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
