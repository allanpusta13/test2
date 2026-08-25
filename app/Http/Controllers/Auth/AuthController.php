<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Show the login screen / metadata.
     */
    public function showLoginForm(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'authenticated' => Auth::check(),
            'user' => Auth::user(),
            'demo_accounts' => [
                [
                    'email' => 'elena@artisanbistro.com',
                    'password' => 'password123',
                    'name' => 'Elena Rostova',
                    'role' => User::ROLE_ADMIN,
                    'role_label' => 'Store Administrator',
                    'badge' => 'Full Access (Admin, Menu, Stock, POS, KDS)',
                    'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                ],
                [
                    'email' => 'sophia@artisanbistro.com',
                    'password' => 'password123',
                    'name' => 'Sophia Rossi',
                    'role' => User::ROLE_CASHIER,
                    'role_label' => 'Front Desk Cashier',
                    'badge' => 'POS Terminal & Cash Collection',
                    'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                ],
                [
                    'email' => 'luigi@artisanbistro.com',
                    'password' => 'password123',
                    'name' => 'Luigi Vanni',
                    'role' => User::ROLE_KITCHEN_STAFF,
                    'role_label' => 'Line Cook / Kitchen Staff',
                    'badge' => 'Kitchen Display (KDS) & Order Bumping',
                    'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                ],
            ],
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        // Check credentials
        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            // Also allow matching against static restaurant dataset users if database user table not synced yet
            $mockUsers = RestaurantDataService::getUsers();
            $matchedMock = null;
            foreach ($mockUsers as $mu) {
                if (strtolower($mu['email']) === strtolower($validated['email']) && in_array($validated['password'], ['password123', 'password', 'admin123', 'secret'], true)) {
                    $matchedMock = $mu;
                    break;
                }
            }

            if ($matchedMock) {
                $user = User::firstOrCreate(
                    ['email' => $matchedMock['email']],
                    [
                        'id' => $matchedMock['id'],
                        'name' => $matchedMock['name'],
                        'role' => $matchedMock['role'],
                        'avatar' => $matchedMock['avatar'] ?? null,
                        'password' => Hash::make($validated['password']),
                    ]
                );
            } else {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials do not match our staff records.'],
                ]);
            }
        }

        Auth::login($user, $request->boolean('remember', true));
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => "Welcome back, {$user->name}!",
            'user' => $user,
            'role' => $user->role,
            'intended_surface' => $this->getDefaultSurfaceForRole($user->role),
        ]);
    }

    /**
     * Quick role-based sign-in for seamless preview testing and staff handoff.
     */
    public function quickLogin(Request $request): JsonResponse
    {
        $role = $request->input('role', User::ROLE_ADMIN);
        $email = $request->input('email');

        $query = User::query();
        if ($email) {
            $query->where('email', $email);
        } else {
            $query->where('role', $role);
        }

        $user = $query->first();

        if (! $user) {
            // Fallback from RestaurantDataService
            $seedUsers = RestaurantDataService::getUsers();
            $seed = collect($seedUsers)->first(fn ($u) => ($email ? $u['email'] === $email : $u['role'] === $role)) ?? $seedUsers[0];

            $user = User::firstOrCreate(
                ['email' => $seed['email']],
                [
                    'id' => $seed['id'],
                    'name' => $seed['name'],
                    'role' => $seed['role'],
                    'avatar' => $seed['avatar'] ?? null,
                    'password' => Hash::make('password123'),
                ]
            );
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => "Logged in as {$user->name} ({$user->role})",
            'user' => $user,
            'role' => $user->role,
            'intended_surface' => $this->getDefaultSurfaceForRole($user->role),
        ]);
    }

    /**
     * Get the authenticated user.
     */
    public function user(Request $request): JsonResponse
    {
        if (Auth::check()) {
            return response()->json([
                'success' => true,
                'authenticated' => true,
                'user' => Auth::user(),
                'role' => Auth::user()->role,
            ]);
        }

        return response()->json([
            'success' => false,
            'authenticated' => false,
            'user' => null,
            'role' => null,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Determine default landing view/surface based on role.
     */
    protected function getDefaultSurfaceForRole(string $role): array
    {
        return match ($role) {
            User::ROLE_CASHIER => [
                'surface' => 'admin',
                'tab' => 'pos',
                'title' => 'POS Terminal',
            ],
            User::ROLE_KITCHEN_STAFF => [
                'surface' => 'admin',
                'tab' => 'kitchen',
                'title' => 'Kitchen Display (KDS)',
            ],
            default => [
                'surface' => 'admin',
                'tab' => 'pos',
                'title' => 'Restaurant Operations Hub',
            ],
        };
    }
}
