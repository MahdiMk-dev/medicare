<?php

namespace Database\Factories;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;

    public function definition()
    {
        return [
            'staff_id' => function () {
                return User::factory()->create()->id;
            },
            'start' => $this->faker->dateTimeBetween('now', '+1 month'),
            'end' => $this->faker->dateTimeBetween('+1 hour', '+2 months'),
        ];
    }
}
