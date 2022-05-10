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
        Schema::create('seeker_skillsets', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('user_id')->on('seekers')->cascadeOnDelete();
            
            $table->unsignedBigInteger('skillset_id')->index();
            $table->foreign('skillset_id')->references('id')->on('skillsets')->cascadeOnDelete();
            
            $table->timestamps();
            $table->primary(['user_id','skillset_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seeker_skillsets');
    }
};
