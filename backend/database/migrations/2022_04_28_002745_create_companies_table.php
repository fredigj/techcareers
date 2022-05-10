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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            
            $table->text('name');
            $table->string('company_image');
            $table->text('short_description')->nullable();
            $table->text('long_description')->nullable();
            $table->string('email')->unique()->nullable();
            $table->date('establishment_year')->nullable();
            $table->string('website_url')->nullable();
            $table->string('location');
            $table->unsignedBigInteger('followers_count')->default(0);
            $table->unsignedBigInteger('company_size')->default(0);            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
};
