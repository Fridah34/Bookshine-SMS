<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        if(1auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        $user = auth()->user();

        //Admin bypasses all permission checks
        if($user -> isAdmin()) {
            return $next($request);
        }

        //Check if user has any of the required permissions
        foreach ($permissions as $permision) {
            if ($user->hasPermission($permission)) {
               return $next($request);
            }
        }
        return response ()->json([
            'success' =>false,
            'message' => 'Unauthorized.You do not have the required permission to access this resource.',
            'required_permissions' => $permissions
        ], 403);
    }
}
