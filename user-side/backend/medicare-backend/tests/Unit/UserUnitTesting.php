<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Medication;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testStoreUserSuccess()
    {
        $response = $this->json('POST', '/api/users', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'User created successfully']);
    }

    public function testStoreUserValidationFailure()
    {
        $response = $this->json('POST', '/api/users', [
            'first_name' => '',
            'last_name' => '',
            'email' => 'invalid-email',
            'password' => 'short',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['first_name', 'last_name', 'email', 'password']);
    }

    public function testShowUserSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $medications = Medication::factory()->count(2)->create(['user_id' => $user->id]);
        $orders = Order::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/user/profile');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'user' => true,
                     'medications' => true,
                     'requests' => true,
                 ]);
    }

    public function testShowUserTokenExpired()
    {
        $token = 'expired_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenExpiredException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/user/profile');

        $response->assertStatus(200)
                 ->assertJson(['status' => 'error', 'message' => 'token_expired']);
    }

    public function testShowUserTokenInvalid()
    {
        $token = 'invalid_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenInvalidException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/user/profile');

        $response->assertStatus(200)
                 ->assertJson(['status' => 'error', 'message' => 'token_invalid']);
    }

    public function testEditUserInfoSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('PUT', '/api/user/edit', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'address' => '123 Main St',
            'phone_number' => '1234567890',
            'dob' => '1990-01-01',
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'status' => 'success',
                     'message' => 'updated successfully',
                     'user' => true,
                 ]);
    }

    public function testEditUserInfoTokenExpired()
    {
        $token = 'expired_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenExpiredException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('PUT', '/api/user/edit', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'address' => '123 Main St',
            'phone_number' => '1234567890',
            'dob' => '1990-01-01',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['status' => 'error', 'message' => 'token_expired']);
    }

    public function testEditUserInfoTokenInvalid()
    {
        $token = 'invalid_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenInvalidException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('PUT', '/api/user/edit', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'address' => '123 Main St',
            'phone_number' => '1234567890',
            'dob' => '1990-01-01',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['status' => 'error', 'message' => 'token_invalid']);
    }
}
