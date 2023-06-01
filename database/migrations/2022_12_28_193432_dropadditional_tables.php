<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropadditionalTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('support_messages');
        Schema::dropIfExists('support_message_threads');
        Schema::dropIfExists('sailing_permits');
        Schema::dropIfExists('report_incidents');
        Schema::dropIfExists('user_verifies');
        Schema::dropIfExists('user_verifies');
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
