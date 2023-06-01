<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameSailingPermitColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sailing_permits',function(Blueprint $table){
            $table->renameColumn('date_of_Expiry', 'date_of_expiry');
            $table->renameColumn('boat_Owner', 'boat_owner');
            $table->renameColumn('captain_Name', 'captain_name');
            $table->renameColumn('Destination', 'destination');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
