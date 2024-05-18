<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Import the Log facade


class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $title = $request->input('title', 'Medication Reminder');
        $body = $request->input('body', 'Don\'t forget your medication');

        Log::info('Notification sent - Title: ' . $title . ', Body: ' . $body);

        return response()->json(['message' => 'Notification sent successfully']);
    }
}
