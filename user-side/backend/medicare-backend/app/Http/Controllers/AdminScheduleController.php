<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Schedule;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreated;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AdminScheduleController extends Controller
{
    
    public function addSchedule(Request $request){
         
        try{
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
                
                    $user = JWTAuth::parseToken()->authenticate();
                    
                    if($user && $user->type=='admin'){
                    $schedule = new Schedule();
                    $schedule->staff_id = $request->staff_id;
                    $schedule->start = $request->start;
                    $schedule->end = $request->end;
                    $schedule->save();
                    return response()->json(['status'=>'success', 'schedule'=>$schedule]);
                    }
                    else{
                    return response()->json(['status'=>'fail', 'message'=>'You are not authorized to add schedule']);   
                    }
                    
                 }
             }
                 } catch (TokenExpiredException $e) {
                
                     return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
                } catch (TokenInvalidException $e) {
                        // Token is invalid
                        return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
                } catch (\Exception $e) {
                        // Other exceptions
                        return response()->json(['status'=>'fail','message' => $e->getMessage()], 401);
                }
            
        
        
    
    }
    
        public function getSchedule(Request $request)
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
                    $users=Schedule::with(['user'])->get();
                    // Find the user by ID
                    $user = User::find($user_id);
                    if($user){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success', 'user'=>$user,'schedule'=>$users]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }
                    }
                    else{

                       $users=Schedule::with(['user'])->where('staff_id',$user_id)->get();
                       return response()->json(['status'=>'success', 'schedule'=>$users,'user'=>$user]);
                               
                    }
                 } catch (TokenExpiredException $e) {
                
                     return response()->json(['status'=>'fail','message' => 'token_expired'], 200);
                } catch (TokenInvalidException $e) {
                        // Token is invalid
                        return response()->json(['status'=>'fail','message' => 'token_invalid'], 200);
                } catch (\Exception $e) {
                        // Other exceptions
                        return response()->json(['status'=>'fail','message' => 'token_exception'], 200);
                }
            }
        }
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    public function delete_schedule($id)
    {
        try {
            // Find the user by ID
            $schedule = schedule::findOrFail($id);
            
            // Delete the user
            $schedule->delete();
            
            // Return success response
            return response()->json(['status' => 'success', 'message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            // Log the error or handle it in some other way
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}
