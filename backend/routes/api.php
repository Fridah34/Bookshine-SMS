<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\StudentController;
use App\Http\Controllers\Api\Admin\TeacherController;
use App\Http\Controllers\Api\Admin\UserController;


//Public routes
Route::post('/register/student', [AuthController::class, 'registerStudent']);
Route::post('/register/parent', [AuthController::class, 'registerParent']);
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

    //User management
    Route::get('/users/pending', [UserController::class, 'pending']);
    Route::post('/users/{id}/approve',[UserController::class,'approve']);
    Route::post('/users/{id}/deactivate',[UserController::class,'deactivate']);
    Route::post('/users/{id}/activate',[UserController::class,'activate']);
    Route::delete('/users/{id}',[UserController::class, 'destroy']);

    //Student management
    Route::get('/students',[StudentController::class,'index']);
    Route::get('/students/pending',[StudentController::class, 'pending']);
    Route::post('/students', [StudentController::class,'store']);
    Route::get('students/{id}',[StudentController::class,'show']);
    Route::put('/students/{id}',[StudentController::class,'update']);
    Route::delete('/students/{id}', [StudentController::class,'destroy']);
    Route::post('/students/{id}/approve', [StudentController::class, 'approve']);

    //Teacher Management
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::post('/teachers', [TeacherController::class, 'store']);
    Route::get('/teachers/{id}', [TeacherController::class,'show']);
    Route::put('/teachers/{id}', [TeacherController::class, 'update']);
    Route::delete('/teachers/{id}', [TeacherController::class,'destroy']);


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

    //Parent routes
    Route::middleware('role:parent,admin')->prefix('parent')->group(function(){
        Route::get('/dashboard', function(){
            return response()->json(['message'=> 'Parent Dashboard']);
        });
    });
});