<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brief_form_id')->constrained();
            $table->foreignId('brand_id')->constrained();
            $table->string('name');
            $table->string('email');
            $table->string('name_to_appear');
            $table->string('competitors')->nullable();
            $table->string('industry')->nullable();
            $table->string('brief_description')->nullable();
            $table->text('formData')->nullable();
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
        Schema::dropIfExists('user_submissions');

    }
}
