<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


//Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh',[AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
});

//Admin routes
Route::middleware('role:admin')->prefix('admin')->group(function(){
    Route::get('/dashboard', function(){
        return response()->json(['message'=> 'Admin DAshboard']);
    });
});

// Teacher routes
    Route::middleware('role:teacher,admin')->prefix('teacher')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Teacher Dashboard']);
        });
        // Add more teacher routes here
    });

    // Student routes
    Route::middleware('role:student,admin')->prefix('student')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Student Dashboard']);
        });
        // Add more student routes here
});