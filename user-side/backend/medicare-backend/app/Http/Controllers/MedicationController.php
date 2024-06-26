<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medication;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;


class MedicationController extends Controller
{
    // Add Medication
    public function addMedication(Request $request)
    {

        if ($request->header('Authorization')) {
            $token = $request->header('Authorization');

            // Check if the token starts with 'Bearer '
            if (Str::startsWith($token, 'Bearer ')) {
                // Extract the token without 'Bearer ' prefix
                $jwtToken = Str::substr($token, 7);

                // Now you have the JWT token
                // You can validate, decode, or perform any operation you need with the token
                // For example, you can use the JWTAuth facade
                try {
                    $token = JWTAuth::parseToken();
                    $user_id = $token->getPayload()->get('sub');

        // Validation
        $validatedData = $request->validate([
            'name' => 'required|string',
            'dose' => 'required|string',
            'instructions' => 'required|string',
            'comments' => 'nullable|string',
        ]);
        $medication=new Medication();
        if(isset($request->user_id))
        $medication-> user_id=$request->user_id;
        else   
        $medication-> user_id=$user_id;
        $medication-> name=$validatedData['name'];
        $medication-> dose=$validatedData['dose'];
        $medication-> instructions=$validatedData['instructions'];
        $medication-> comments=$validatedData['comments'];
        $medication-> Time=$request->Time;
        $medication->save();

        // Return response
        return response()->json(['status' => 'success', 'message' => 'Medication added successfully' ],200);
    } catch (TokenExpiredException $e) {
        // Token has expired
        return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
    } catch (TokenInvalidException $e) {
        // Token is invalid
        return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
    } catch (\Exception $e) {
        // Other exceptions
        return response()->json(['status'=>'fail','message' => $e->getMessage()], 401);
    }
                }
            }
            else {
                return response()->json(['status'=>'fail','message' => 'no token found'], 401);
            }
    }

    // Edit Medication
    public function editMedication(Request $request,$id)
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
       

        // Find medication
        $medication = Medication::findOrFail($id);

        // Update medication attributes
        $medication-> name=$request->name;
        $medication-> dose=$request->dose;
        $medication-> instructions=$request->instructions;
        $medication-> comments=$request->comments;
        $medication-> Time=$request->Time;
        $medication->save();
        // Return response
        return response()->json(['status' => 'success', 'message' => 'Medication updated successfully', 'data' => $medication]);

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
    // Delete Medication
    public function deleteMedication($id)
    {
       
        $medication = Medication::findOrFail($id);
         if (!$medication) {
            return response()->json(['status' => 'error','message'=>'Item not found'], 200);
        }
        // Delete medication
        $medication->delete();

        // Return response
        return response()->json(['status' => 'success', 'message' => 'Medication deleted successfully']);
    }
    public function getmedication($id)
    {
       
        $medication = Medication::findOrFail($id);
         if (!$medication) {
            return response()->json(['status' => 'error','message'=>'medication not found'], 200);
        }


        // Return response
        return response()->json(['status' => 'success', 'medication' => $medication]);
    }
}
