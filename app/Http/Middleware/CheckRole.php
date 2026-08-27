<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$allowedRoles): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $roleName = $user->role;

        if (! $roleName || ! in_array($roleName, $allowedRoles, true)) {
            abort(403, 'Unauthorized. Required role: '.implode(' or ', $allowedRoles));
        }

        return $next($request);
    }
}
