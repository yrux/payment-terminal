<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMFlagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_flags', function (Blueprint $table) {
            $table->id();
            $table->string('flag_type');
            $table->string('flag_value');
            $table->timestamps();
        });
        // Schema::create('m_flag_values', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('m_flag_id')->constrained();
        //     $table->string('flag_value');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('m_flag_values');
        Schema::dropIfExists('m_flags');
    }
}
