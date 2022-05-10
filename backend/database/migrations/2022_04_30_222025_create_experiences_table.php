<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('company');        
            $table->string('title');        
            $table->string('location');        
            $table->text('description')->nullable();        
            $table->string('employment_type')->nullable();        
            $table->boolean('is_current');        
            $table->date('start_date');        
            $table->date('end_date')->nullable();        
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('seekers')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiences');
    }
};
