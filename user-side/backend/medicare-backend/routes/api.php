<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DutyController;
use App\Http\Controllers\UserController;



    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/show', [UserController::class, 'show']); 
    Route::put('/users/{id}', [UserController::class, 'update']);    
    Route::post('/duties', [DutyController::class, 'store']);
    Route::put('/duties/{id}', [DutyController::class, 'update']);
    Route::delete('/duties/{id}', [DutyController::class, 'destroy']);
;
