<?php

namespace Database\Factories;

use App\Models\Medication;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicationFactory extends Factory
{
    protected $model = Medication::class;

    public function definition()
    {
        return [
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'name' => $this->faker->word(),
            'dose' => $this->faker->word(),
            'instructions' => $this->faker->sentence(),
            'comments' => $this->faker->paragraph(), 
            'Time' => $this->faker->time(),

        ];
    }
}
