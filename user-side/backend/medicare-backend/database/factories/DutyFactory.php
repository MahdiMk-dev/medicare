<?php

namespace Database\Factories;

use App\Models\Duty;
use Illuminate\Database\Eloquent\Factories\Factory;

class DutyFactory extends Factory
{
    protected $model = Duty::class;

    public function definition()
    {
        return [
            'staff_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'request_id' => function () {
                return \App\Models\Order::factory()->create()->id;
            },
        ];
    }
}
