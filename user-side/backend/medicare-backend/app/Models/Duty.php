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
     public function order()
    {
        return $this->belongsTo(Order::class);
    }
     public function user()
    {
        return $this->belongsTo(User::class,'staff_id');
    }
    // Define any relationships here
}
