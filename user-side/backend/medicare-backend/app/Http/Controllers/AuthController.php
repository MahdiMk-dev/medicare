<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;


use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json(['message' => 'Invalid Email', 'status' => 'fail'], 401);
        }
    
        if (!password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password', 'status' => 'fail'], 401);
        }
        
        // Generate token
        $token = JWTAuth::fromUser($user);
    
        // Return success message, user information, and token
        return response()->json([
            'message' => 'Login successful',
            'status' => 'success',
            'token' => $token,
            'user' => [
                'id' => $user->id,
            ]
        ], 200);
    }
    

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
    
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));
    
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User logged out successfully']);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
    public function hello()
    {
        return 'hi';
    }
    /*public function signup(Request $request)
    {
        // Create a new user instance
        $user = new User();
        $user->email = $request->email;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone_number = $request->phone_number;
        $user->city = $request->city;
        $user->dob = $request->dob;

        
        $user->password = Hash::make($request->password);
        // You can add more fields here if needed
        // Example: $user->name = $request->name;

        // Save the user record
        $user->save();

        // Return a success response
        return response()->json(['message' => 'Signup successful', 'status' => 'success','user'=>$user], 201);
    }*/
}
