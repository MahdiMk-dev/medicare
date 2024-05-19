<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testGetDashboardSuccess()
    {
        $user = User::factory()->create(['type' => 'admin']);
        $token = JWTAuth::fromUser($user);

        // Create some orders with different statuses
        Order::factory()->count(3)->create(['status' => 'pending']);
        Order::factory()->count(2)->create(['status' => 'completed']);
        Order::factory()->count(1)->create(['status' => 'cancelled']);

        // Create some patients
        User::factory()->count(5)->create(['type' => 'patient']);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/dashboard');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'pending' => 3,
                     'completed' => 2,
                     'cancelled' => 1,
                     'patients' => true,
                 ]);
    }

    public function testGetDashboardNoToken()
    {
        $response = $this->json('GET', '/api/admin/dashboard');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'fail',
                     'message' => 'no token found',
                 ]);
    }

    public function testGetDashboardTokenExpired()
    {
        $token = 'expired_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenExpiredException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/dashboard');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'fail',
                     'message' => 'token_expired',
                 ]);
    }

    public function testGetDashboardTokenInvalid()
    {
        $token = 'invalid_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenInvalidException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/dashboard');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'fail',
                     'message' => 'token_invalid',
                 ]);
    }

    public function testGetDashboardUnauthorizedUser()
    {
        $user = User::factory()->create(['type' => 'patient']);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/dashboard');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'fail',
                     'message' => 'not authorized',
                 ]);
    }
}
