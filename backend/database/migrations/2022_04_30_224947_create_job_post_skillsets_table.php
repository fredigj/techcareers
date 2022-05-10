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
        Schema::create('job_post_skillsets', function (Blueprint $table) {
            // $table->id();
            $table->unsignedBigInteger('job_post_id')->index();
            $table->foreign('job_post_id')->references('id')->on('job_posts')->cascadeOnDelete();
            
            $table->unsignedBigInteger('skillset_id')->index();
            $table->foreign('skillset_id')->references('id')->on('skillsets')->cascadeOnDelete();
            
            $table->timestamps();
            $table->primary(['job_post_id','skillset_id']);            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_post_skillsets');
    }
};
