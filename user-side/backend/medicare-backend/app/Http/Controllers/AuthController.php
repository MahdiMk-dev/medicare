<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


use Illuminate\Support\Facades\Validator;
//export PATH="/Applications/AMPPS/apps/php74/bin:$PATH"
//php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->where('type', 'patient')->first();
        
        if (!$user) {
            return response()->json(['message' => 'Invalid Email', 'status' => 'fail'], 401);
        }
    
        if (!password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password', 'status' => 'fail'], 401);
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
    

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['status' => 'Error', 'message'=> $validator->errors()->toJson()]);
        }
                    $user = new User();
                    $user->first_name =$request->first_name;
                    $user->last_name = $request->last_name;
                    $user->email = $request->email;
                    $user->dob = $request->dob;
                    $user->type = 'patient';
                    $user->gender = $request->gender;
                    $user->password= bcrypt($request->password);
                    $user->address=$request->address;
                    $user->phone_number=$request->phone_number;
                    try {
                        if($user->dob>(Carbon::today())){
                            return response()->json(['status' => 'Error', 'message'=>'dob is not valid']);

                        }
                        $user->save();
                        return response()->json(['status'=>'success','message' => 'User Registered Successfully']);
                    } catch (\Exception $e) {
                        // Log the error or handle it in some other way
                        echo "Error: " . $e->getMessage();
                        return response()->json(['status' => 'Error', 'message'=>'User not created']);
                    }


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


}
