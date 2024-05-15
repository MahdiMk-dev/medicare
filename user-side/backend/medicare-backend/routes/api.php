<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DutyController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\AdminLoginController;
use Symfony\Component\Routing\RequestContext;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminPatientController;
use App\Events\MedicationReminderEvent;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminScheduleController;
use App\Http\Controllers\AdminDashboardController;


    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/adminlogin', [AdminLoginController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/show', [UserController::class, 'show']); 
    Route::put('/users/{id}', [UserController::class, 'update']);    
    Route::post('/duties', [DutyController::class, 'store']);
    Route::put('/duties/{id}', [DutyController::class, 'update']);
    Route::delete('/duties/{id}', [DutyController::class, 'destroy']);
    Route::post('/create-request', [RequestController::class,'create_request']);
    Route::post('/edit_profile', [UserController::class,'editinfo']);
    Route::delete('/delete_medication/{id}', [MedicationController::class,'deleteMedication']);
    Route::post('/add_medication', [MedicationController::class,'addMedication']);
    Route::post('/medication/{id}', [MedicationController::class,'editMedication']);
    Route::get('/get_medication/{id}', [MedicationController::class,'getmedication']);
    Route::get('/getadminusers', [AdminUserController::class,'getUsers']);
    Route::delete('/delete_user/{id}', [AdminUserController::class,'delete_user']);
    Route::get('/get_user/{id}', [AdminUserController::class,'getuser']);
    Route::post('/create_user', [AdminUserController::class,'create_user']);
    Route::post('/update_user', [AdminUserController::class,'updateuser']);
    Route::get('/get_patients', [AdminPatientController::class,'getPatients']);
    Route::get('/get_patient/{id}', [AdminPatientController::class,'getpatient']);
    Route::get('/send-notification', function () {
        event(new MedicationReminderEvent());
        return "Notification sent!";});
    Route::post('/send-notification', [NotificationController::class,'sendNotification']);
    Route::get('/dueMedications', [MedicationController::class, 'getDueMedications']);

    Route::post('/get_user_type', [AdminUserController::class,'getUserType']);

    Route::get('/get_requests', [RequestController::class,'get_requests']);
    Route::get('/get_request/{id}', [RequestController::class,'get_request']);
    Route::get('/get_duties', [DutyController::class,'get_duties']);
    Route::get('/get_duty/{id}', [DutyController::class,'get_duty']);
    Route::get('/cancel_request/{id}', [RequestController::class,'cancel_request']);
    Route::get('/complete_request/{id}', [RequestController::class,'complete_request']);
    Route::post('/get_staff', [AdminUserController::class,'getUserType']);
    Route::get('/get_schedule', [AdminScheduleController::class,'getSchedule']);
    Route::post('/add_schedule', [AdminScheduleController::class,'addSchedule']);
    Route::get('/get_dashboard', [AdminDashboardController::class,'getDashboard']);
    
    
    
    
    
