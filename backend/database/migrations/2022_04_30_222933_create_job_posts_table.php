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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('headline');        
            $table->text('description');        
            $table->string('location');        
            $table->string('location_type');        
            $table->boolean('is_active')->default(1);        
            $table->string('seniority_level');        
            $table->string('pay_range');
            $table->string('employment_type');
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('recruiters')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_posts');
    }
};
