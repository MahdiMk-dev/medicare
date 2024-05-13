<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PatientRequests;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;


class RequestController extends Controller
{


public function createRequest(Request $request)
{
    // Check if the request contains the Authorization header
    if (!$request->hasHeader('Authorization')) {
        return response()->json(['status' => 'fail', 'message' => 'No token found'], 401);
    }

    $token = $request->header('Authorization');

    // Check if the token starts with 'Bearer '
    if (!Str::startsWith($token, 'Bearer ')) {
        return response()->json(['status' => 'fail', 'message' => 'Invalid token format'], 401);
    }

    // Extract the token without the 'Bearer ' prefix
    $jwtToken = Str::substr($token, 7);

    try {
        // Validate and decode the token
        $token = JWTAuth::parseToken();
        $user_id = $token->getPayload()->get('sub');

        // Validation
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|integer',
            'start' => 'required|date',
            'end' => 'required|date',
            'urgent' => 'required|string',
            'image' => 'nullable|image|max:2048', // Assuming images are uploaded
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'fail', 'message' => $validator->errors()], 422);
        }

        // Create a new request record
        $newRequest = new PatientRequests();
        $newRequest->user_id = $user_id;
        $newRequest->service_id = $request->input('service_id');
        $newRequest->start = $request->input('start');
        $newRequest->end = $request->input('end');
        $newRequest->status = 'pending';
        $newRequest->urgent = $request->input('urgent', false); // Use input with default value
        

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images'); 
            $newRequest->image = $imagePath;
        }

        // Save the request
        $newRequest->save();

        // Return success response
        return response()->json(['status' => 'success', 'message' => 'Request placed successfully!']);

    } catch (TokenExpiredException $e) {
        // Token has expired
        return response()->json(['status' => 'fail', 'message' => 'Token expired'], 401);
    } catch (TokenInvalidException $e) {
        // Token is invalid
        return response()->json(['status' => 'fail', 'message' => 'Token invalid'], 401);
    } catch (\Exception $e) {
        // Other exceptions
        return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 500);
    }
}

public function editRequest(Request $request)
{
    // Check if the request contains the Authorization header
    if (!$request->hasHeader('Authorization')) {
        return response()->json(['status' => 'fail', 'message' => 'No token found'], 401);
    }

    $token = $request->header('Authorization');

    // Check if the token starts with 'Bearer '
    if (!Str::startsWith($token, 'Bearer ')) {
        return response()->json(['status' => 'fail', 'message' => 'Invalid token format'], 401);
    }

    // Extract the token without the 'Bearer ' prefix
    $jwtToken = Str::substr($token, 7);

    try {
        // Validate and decode the token
        $token = JWTAuth::parseToken();
        $user_id = $token->getPayload()->get('sub');

        // Validation
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|integer',
            'start' => 'required|date',
            'end' => 'required|date',
            'urgent' => 'required|string',
            'image' => 'nullable|image|max:2048', // Assuming images are uploaded
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'fail', 'message' => $validator->errors()], 422);
        }
        $id=$request->input('service_id');

        // Find the request by ID
        $requestModel = PatientRequests::findOrFail($id);

        // Update request attributes
        $requestModel->service_id = $request->input('service_id');
        $requestModel->start = $request->input('start');
        $requestModel->end = $request->input('end');
        $requestModel->urgent = $request->input('urgent');
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images'); 
            $requestModel->image = $imagePath;
        }

        // Save the request
        $requestModel->save();

        // Return success response
        return response()->json(['status' => 'success', 'message' => 'Request updated successfully', 'data' => $requestModel]);

    } catch (TokenExpiredException $e) {
        // Token has expired
        return response()->json(['status' => 'fail', 'message' => 'Token expired'], 401);
    } catch (TokenInvalidException $e) {
        // Token is invalid
        return response()->json(['status' => 'fail', 'message' => 'Token invalid'], 401);
    } catch (\Exception $e) {
        // Other exceptions
        return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 500);
    }
}

}