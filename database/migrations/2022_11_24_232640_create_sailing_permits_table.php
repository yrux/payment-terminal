<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSailingPermitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sailing_permits', function (Blueprint $table) {
            $table->id();
            $table->integer('role_id');
            $table->string('boat_number');
            $table->string('boat_name');
            $table->date('date_of_Expiry');
            $table->string('boat_Owner');
            $table->string('captain_Name');
            $table->string('phone');
            $table->date('date_of_departure');
            $table->time('time_of_departure');
            $table->string('port_of_departure');
            $table->time('time_of_arrival');
            $table->date('date_of_arrival');
            $table->string('Destination');
            $table->integer('no_of_passengers');
            $table->integer('no_of_crew');
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
        Schema::dropIfExists('sailing_permits');
    }
}
