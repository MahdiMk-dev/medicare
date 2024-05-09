<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use Illuminate\Http\Request;

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
            'request_id' => 'required|exists:requests,id',
            // Add more validation rules as needed
        ]);

        Duty::create($request->all());

        return response()->json(['message' => 'Duty created successfully'], 201);
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
