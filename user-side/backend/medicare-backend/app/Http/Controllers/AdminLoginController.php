<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;


use Illuminate\Support\Facades\Validator;
//export PATH="/Applications/AMPPS/apps/php74/bin:$PATH"
//php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

class AdminLoginController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->where('type', '!=','patient')->first();
        
        if (!$user) {
            return response()->json(['message' => 'Invalid Email', 'status' => 'fail'], 200);
        }
    
        if (!password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password', 'status' => 'fail'], 200);
        }
        
        // Generate token
        $token = JWTAuth::fromUser($user,[
            'id' => $user->id,
            'type' => $user->type,
        ]);
        // Return success message, user information, and token
        return response()->json([
            'message' => 'Login successful',
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ], 200);
    }
    


}
