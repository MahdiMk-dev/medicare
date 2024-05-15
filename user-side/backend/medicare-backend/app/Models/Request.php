<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientRequests extends Model
{
    protected $table = 'patient_requests';
    protected $fillable = [
        'user_id',
        'service_id',
        'start',
        'end',
        'status',
        'urgent',
        'image',
    ];
    public function requests()
    {
        return $this->hasMany(PatientRequests::class);
    }

    // Define any relationships or additional functionality here
}
