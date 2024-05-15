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

class AdminDashboardController extends Controller
{
   
    public function getDashboard(Request $request )
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
               
                    if($user){
                        $pendingRequestsCount = Order::where('status', 'pending')->count();
                        $completedRequestsCount = Order::where('status', 'completed')->count();
                        $cancelledRequestsCount = Order::where('status', 'cancelled')->count();
                        $patients = User::where('type', 'patient')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

             // Return data as JSON response
    return response()->json([
        'status'=>'success',
        'user' => $user,
        'pending' => $pendingRequestsCount,
        'completed' => $completedRequestsCount,
        'cancelled' => $cancelledRequestsCount,
        'patients'=>$patients
            ]); 

                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'not authorized']);   
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

}
