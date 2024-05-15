<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use Illuminate\Http\Request;
use App\Models\Order;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class DutyController extends Controller
{
    /**
     * Store a newly created duty in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'order_id' => 'required|exists:requests,id',
            // Add more validation rules as needed
        ]);
        $duty= new Duty();
        $duty->staff_id=$request->staff_id;
        $duty->order_id=$request->order_id;

        $duty->save();

        return response()->json(['status'=>'success','message' => 'Duty created successfully'], 201);
    }
    public function get_duties(Request $request)
{
    // Check if the request contains the Authorization header
    if (!$request->hasHeader('Authorization')) {
        return response()->json(['status' => 'fail', 'message' => 'No token found'], 200);
    }

    $token = $request->header('Authorization');

    // Check if the token starts with 'Bearer '
    if (!Str::startsWith($token, 'Bearer ')) {
        return response()->json(['status' => 'fail', 'message' => 'Invalid token format'], 200);
    }

    // Extract the token without the 'Bearer ' prefix
    $jwtToken = Str::substr($token, 7);

    try {
        // Validate and decode the token
        $token = JWTAuth::parseToken();
        $user_id = $token->getPayload()->get('sub');
        $user = JWTAuth::parseToken()->authenticate();

        if($user["type"]=='admin'){
                    $duty=Duty::with(['order.service','user'])->get();
                    return response()->json(['status'=>'success', 'user'=>$user,'duty'=>$duty]);
                   
        }
        else{
            $duty=Duty::with(['order.service','user'])->where('staff_id',$user_id)->get();
            return response()->json(['status'=>'success', 'user'=>$user,'duty'=>$duty]);
        }

    } catch (TokenExpiredException $e) {
        // Token has expired
        return response()->json(['status' => 'fail', 'message' => 'Token expired'], 200);
    } catch (TokenInvalidException $e) {
        // Token is invalid
        return response()->json(['status' => 'fail', 'message' => 'Token invalid'], 200);
    } catch (\Exception $e) {
        // Other exceptions
        return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
    }
}
public function get_duty(Request $request,$id)
{
    // Check if the request contains the Authorization header
    if (!$request->hasHeader('Authorization')) {
        return response()->json(['status' => 'fail', 'message' => 'No token found'], 200);
    }

    $token = $request->header('Authorization');

    // Check if the token starts with 'Bearer '
    if (!Str::startsWith($token, 'Bearer ')) {
        return response()->json(['status' => 'fail', 'message' => 'Invalid token format'], 200);
    }

    // Extract the token without the 'Bearer ' prefix
    $jwtToken = Str::substr($token, 7);

    try {
        // Validate and decode the token
        $token = JWTAuth::parseToken();
        $user_id = $token->getPayload()->get('sub');
        $user = JWTAuth::parseToken()->authenticate();

        if($user["type"]=='admin'){
                    $duty=Duty::with(['order'])->where('id',$id)->get();
                    return response()->json(['status'=>'success', 'user'=>$user,'duty'=>$orders]);
                   
        }
        else{
            $duty=Duty::with(['order'])->where('user_id',$user_id)->where('id',$id)->get();
            return response()->json(['status'=>'success', 'user'=>$user,'duty'=>$orders]);
        }

    } catch (TokenExpiredException $e) {
        // Token has expired
        return response()->json(['status' => 'fail', 'message' => 'Token expired'], 200);
    } catch (TokenInvalidException $e) {
        // Token is invalid
        return response()->json(['status' => 'fail', 'message' => 'Token invalid'], 200);
    } catch (\Exception $e) {
        // Other exceptions
        return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
    }
}

    /**
     * Update the specified duty in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $duty = Duty::findOrFail($id);

        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'request_id' => 'required|exists:requests,id',
            // Add more validation rules as needed
        ]);

        $duty->fill($request->all());
        $duty->save();

        return response()->json(['message' => 'Duty updated successfully'], 200);
    }

    /**
     * Remove the specified duty from the database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $duty = Duty::findOrFail($id);
        $duty->delete();

        return response()->json(['message' => 'Duty deleted successfully'], 200);
    }
}
