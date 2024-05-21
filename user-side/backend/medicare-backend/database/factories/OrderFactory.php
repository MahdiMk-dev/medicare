<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'service_id' => function () {
                return \App\Models\Service::factory()->create()->id;
            },
            'start' => $this->faker->dateTimeBetween('now', '+1 month'),
            'end' => $this->faker->dateTimeBetween('+1 hour', '+2 months'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'urgent' => $this->faker->optional()->randomDigit,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
