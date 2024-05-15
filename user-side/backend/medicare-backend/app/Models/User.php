<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class user extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    // Other class properties and methods...

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function medications()
    {
        return $this->hasMany(Medication::class);
    }

    public function requests()
    {
        return $this->hasMany(Order::class);
    }
     public function duty()
    {
        return $this->hasMany(Duty::class,'staff_id');
    }
    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }
}



