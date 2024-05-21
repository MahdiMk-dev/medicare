<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{

    Schema::create('medications', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id');
        $table->string('name');
        $table->string('dose');
        $table->string('instructions');
        $table->text('comments');
        $table->time('Time');
        $table->timestamps();
    });
}
public function down()
{
    Schema::dropIfExists('users');
}
};