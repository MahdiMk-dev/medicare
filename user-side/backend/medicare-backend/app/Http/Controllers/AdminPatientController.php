<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreated;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Models\User;
use App\Models\Medication;
use App\Models\Order;

class AdminPatientController extends Controller
{
   
    public function getpatient(Request $request, $id)
    {
        // Validate the incoming request data
             if ($request->header('Authorization')) {
            // Extract the token from the Authorization header
            $token = $request->header('Authorization');

            // Check if the token starts with 'Bearer '
            if (Str::startsWith($token, 'Bearer ')) {
                // Extract the token without 'Bearer ' prefix
                $jwtToken = Str::substr($token, 7);

                // Now you have the JWT token
                // You can validate, decode, or perform any operation you need with the token
                // For example, you can use the JWTAuth facade
                try {
                    $user = JWTAuth::parseToken()->authenticate();
                    if($user["type"]=='admin'){
                    // Find the user by ID
                    $user = User::find($id);
                    if($user){
                        $medications = Medication::where('user_id', $id)->get();
                        $requests = Order::with(['user','service'])
                            ->whereHas('user', function ($query) use ($id) {
                                $query->where('id', $id);
                            })
                            ->get();

             // Return data as JSON response
    return response()->json([
        'status'=>'success',
        'user' => $user,
        'medications' => $medications,
        'requests' => $requests,
            ]); 

                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }
                    }
                    else{
                       return response()->json(['status'=>'fail', 'message'=>'Cannot Update user']);
                               
                    }
                 } catch (TokenExpiredException $e) {
                
                     return response()->json(['status'=>'fail','message' => 'token_expired'], 200);
                } catch (TokenInvalidException $e) {
                        // Token is invalid
                        return response()->json(['status'=>'fail','message' => 'token_invalid'], 200);
                } catch (\Exception $e) {
                        // Other exceptions
                        return response()->json(['status'=>'fail','message' => $e->getMessage()], 200);
                }
            }
        }
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 200);
        }
    }
        public function getPatients(Request $request)
    {
        // Validate the incoming request data
             if ($request->header('Authorization')) {
            // Extract the token from the Authorization header
            $token = $request->header('Authorization');

            // Check if the token starts with 'Bearer '
            if (Str::startsWith($token, 'Bearer ')) {
                // Extract the token without 'Bearer ' prefix
                $jwtToken = Str::substr($token, 7);

                // Now you have the JWT token
                // You can validate, decode, or perform any operation you need with the token
                // For example, you can use the JWTAuth facade
                try {
                    $user = JWTAuth::parseToken()->authenticate();
                    $token = JWTAuth::parseToken();
                    $user_id = $token->getPayload()->get('sub');
                    if($user["type"]=='admin'){
                    $users=user::where('type','=','patient')->get();
                    // Find the user by ID
                    $user = User::find($user_id);
                    if($user){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success', 'user'=>$user,'users'=>$users]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }
                    }
                    else{
                    $users = User::where('type', '=', 'patient')
                     ->whereHas('requests') // Users with at least one related request
                     ->get();
                    // Find the user by ID
                    $user = User::find($user_id);
                    if($user){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success', 'user'=>$user,'users'=>$users]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }       
                    }
                 } catch (TokenExpiredException $e) {
                
                     return response()->json(['status'=>'fail','message' => 'token_expired'], 200);
                } catch (TokenInvalidException $e) {
                        // Token is invalid
                        return response()->json(['status'=>'fail','message' => 'token_invalid'], 200);
                } catch (\Exception $e) {
                        // Other exceptions
                        return response()->json(['status'=>'fail','message' => $e->getMessage()], 200);
                }
            }
        }
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    
}
