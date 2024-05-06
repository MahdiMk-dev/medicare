<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutiesTable extends Migration
{
    public function up()
    {
        Schema::create('duties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id');
            $table->foreignId('request_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('duties');
    }
}
