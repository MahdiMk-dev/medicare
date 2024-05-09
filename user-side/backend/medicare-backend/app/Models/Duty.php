<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Duty extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id',
        'request_id',
        // Add more fillable attributes as needed
    ];

    // Define any relationships here
}
