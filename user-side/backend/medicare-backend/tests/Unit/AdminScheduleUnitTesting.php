<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Schedule;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminScheduleControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAddScheduleSuccess()
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $token = JWTAuth::fromUser($admin);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/admin/schedules', [
            'staff_id' => 1,
            'start' => '2024-05-01 08:00:00',
            'end' => '2024-05-01 17:00:00',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['status' => 'success']);
    }

    public function testAddScheduleUnauthorized()
    {
        $user = User::factory()->create(['type' => 'user']);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/admin/schedules', [
            'staff_id' => 1,
            'start' => '2024-05-01 08:00:00',
            'end' => '2024-05-01 17:00:00',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['status' => 'fail', 'message' => 'You are not authorized to add schedule']);
    }

    public function testAddScheduleTokenExpired()
    {
        $token = 'expired_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenExpiredException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/admin/schedules', [
            'staff_id' => 1,
            'start' => '2024-05-01 08:00:00',
            'end' => '2024-05-01 17:00:00',
        ]);

        $response->assertStatus(401)
                 ->assertJson(['status' => 'fail', 'message' => 'token_expired']);
    }

    public function testAddScheduleTokenInvalid()
    {
        $token = 'invalid_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenInvalidException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/admin/schedules', [
            'staff_id' => 1,
            'start' => '2024-05-01 08:00:00',
            'end' => '2024-05-01 17:00:00',
        ]);

        $response->assertStatus(401)
                 ->assertJson(['status' => 'fail', 'message' => 'token_invalid']);
    }

    public function testGetScheduleAdminSuccess()
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $token = JWTAuth::fromUser($admin);

        $schedule = Schedule::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/schedules');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'schedule' => true,
                 ]);
    }

    public function testGetScheduleUserSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $schedule = Schedule::factory()->create(['staff_id' => $user->id]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/schedules');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'schedule' => true,
                     'user' => true,
                 ]);
    }

    public function testGetScheduleTokenExpired()
    {
        $token = 'expired_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenExpiredException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/schedules');

        $response->assertStatus(200)
                 ->assertJson(['status' => 'fail', 'message' => 'token_expired']);
    }

    public function testGetScheduleTokenInvalid()
    {
        $token = 'invalid_token_example';

        JWTAuth::shouldReceive('parseToken')->andThrow(new TokenInvalidException());

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('GET', '/api/admin/schedules');

        $response->assertStatus(200)
                 ->assertJson(['status' => 'fail', 'message' => 'token_invalid']);
    }

    public function testDeleteScheduleSuccess()
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $token = JWTAuth::fromUser($admin);

        $schedule = Schedule::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('DELETE', '/api/admin/schedules/' . $schedule->id);

        $response->assertStatus(200)
                 ->assertJson(['status' => 'success', 'message' => 'User deleted successfully']);
    }

    public function testDeleteScheduleNotFound()
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $token = JWTAuth::fromUser($admin);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('DELETE', '/api/admin/schedules/9999');

        $response->assertStatus(500)
                 ->assertJson(['status' => 'error', 'message' => 'No query results for model [App\\Models\\Schedule] 9999']);
    }
}
