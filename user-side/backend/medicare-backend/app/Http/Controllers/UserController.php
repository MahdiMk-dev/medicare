<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Medication;
use App\Models\Order;


use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


class UserController extends Controller
{
    /**
     * Store a newly created user in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $user = new User();
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        // Assign other fields as needed
        $user->save();

        return response()->json(['message' => 'User created successfully'], 201);
    }

    /**
     * Update the specified user in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        try{
        // Extract the user ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $user_id = $token->getPayload()->get('sub');
    
        // Retrieve user by ID
        $user = User::findOrFail($user_id);
    
        // Retrieve all medications for the user

        $medications = Medication::with(['user', 'dose', 'instuctions','comments'])
            ->whereHas('user', function ($query) use ($user_id) {
                $query->where('id', $user_id);
            })
            ->get();
        $requests = Order::with(['user_id','service_id','start','end','status','urgent','image'])
            ->whereHas('user', function ($query) use ($user_id) {
                $query->where('id', $user_id);
            })
            ->get();
        
    
        
                       
    
        // Return data as JSON response
        return response()->json([
            'status'=>'success',
            'user' => $user,
            'medications' => $medications,
            'requests' => $requests,
                ]);
    }catch (TokenExpiredException $e) {
                
        return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
   } catch (TokenInvalidException $e) {
           // Token is invalid
           return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
   } catch (\Exception $e) {
           // Other exceptions
           return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
   }
    }

     public function editinfo(Request $request)
     {
     try{
         // Extract the user ID from the JWT token payload
         $token = JWTAuth::parseToken();
         $userId = $token->getPayload()->get('sub');
     
         // Create a new coin request instance
         $user = User::findOrFail($userId);
         $user->first_name = $$request->first_name;
         $user->last_name = $request->last_name;
         $user->city = $request->city;
         $user->phone_number = $request->phone_number;
         $user->dob = $request->dob;
         $user->save();
     
         // Return success response
         return response()->json([
             'status'=>'success',
             'message' => 'updated successfully',
         ], 201);
     }catch (TokenExpiredException $e) {
                 
         return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
     } catch (TokenInvalidException $e) {
            // Token is invalid
            return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
     } catch (\Exception $e) {
            // Other exceptions
            return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
     }
     }

}
