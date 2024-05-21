<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Medication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class MedicationTest extends TestCase
{
    use RefreshDatabase;

    public function testAddMedicationSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/add_medication', [
            'name' => 'Aspirin',
            'dose' => '100mg',
            'instructions' => 'Take one daily',
            'comments' => 'No comments',
            'Time' => now(),
        ]) ->assertJson(['status' => 'success', 'message' => 'Medication added successfully']);
    }

    public function testAddMedicationTokenExpired()
    {
        $token = 'expired_token_example';

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/add_medication', [
            'name' => 'Aspirin',
            'dose' => '100mg',
            'instructions' => 'Take one daily',
        ])->assertStatus(401)
          ->assertJson(['status' => 'fail', 'message' => 'token_invalid']);
    }

    public function testEditMedicationSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);
        $medication = Medication::factory()->create(['user_id' => $user->id]);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', "/api/medication/{$medication->id}", [
            'name' => 'Updated Aspirin',
            'dose' => '150mg',
            'instructions' => 'Take one twice daily',
            'comments' => 'Updated comments',
            'Time' => now(),
        ])->assertStatus(200)
          ->assertJson(['status' => 'success', 'message' => 'Medication updated successfully']);
    }

    public function testDeleteMedicationSuccess()
    {
        $medication = Medication::factory()->create();

        $this->json('DELETE', "/api/delete_medication/{$medication->id}")
             ->assertStatus(200)
             ->assertJson(['status' => 'success', 'message' => 'Medication deleted successfully']);
    }

    public function testGetMedicationSuccess()
    {
        $medication = Medication::factory()->create();

        $this->json('GET', "/api/get_medication/{$medication->id}")
             ->assertStatus(200)
             ->assertJson(['status' => 'success', 'medication' => $medication->toArray()]);
    }
}
