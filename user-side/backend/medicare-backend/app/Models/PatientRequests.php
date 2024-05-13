<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientRequests extends Model
{
    protected $table = 'requests';
    protected $fillable = [
        'user_id',
        'service_id',
        'start',
        'end',
        'status',
        'urgent',
        'image',
    ];

    // Define any relationships or additional functionality here
}
