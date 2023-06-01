<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UsersPsuedosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_brands',function(Blueprint $table){
            $table->foreignId('brand_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('pseudo_name');
            $table->string('pseudo_email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_brands');
    }
}
