<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PatientRequests;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
class RequestController extends Controller
{
    public function store(PatientRequests $request)
    {
        // Retrieve the authenticated user ID from the JWT token
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

        // Validate incoming request data
        $validatedData = $request->validate([
            'service_id' => 'required|integer',
            'start' => 'required|date',
            'end' => 'required|date',
            'status' => 'required|string|max:255',
            'urgent' => 'boolean',
            'image' => 'nullable|image|max:2048', // Assuming images are uploaded
        ]);

        // Create a new request record
        $newRequest = new PatientRequests();
        $newRequest->user_id = $userId;
        $newRequest->service_id = $validatedData['service_id'];
        $newRequest->start = $validatedData['start'];
        $newRequest->end = $validatedData['end'];
        $newRequest->status = $validatedData['status'];
        $newRequest->urgent = $request->has('urgent') ? true : false;
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images'); // Store image in storage/app/images directory
            $newRequest->image = $imagePath;
        }

        // Save the request
        $newRequest->save();

        // Redirect or return a response
        return redirect()->route('home')->with('success', 'Request placed successfully!');
    }
}
