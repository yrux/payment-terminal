<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;
class AddMFlagValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        MFlag::create(['flag_type' => 'AUTHORIZELOGINID','flag_value' => '3UeCfUw4d73E']);
        MFlag::create(['flag_type' => 'AUTHORIZETRANSACTIONKEY','flag_value' => '364CqEdF84KAj2M2']);
        MFlag::create(['flag_type' => 'AUTHORIZEENDPOINT','flag_value' => 'https://apitest.authorize.net/xml/v1/request.api']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        MFlag::whereIn('flag_type' ,['AUTHORIZELOGINID','AUTHORIZETRANSACTIONKEY','AUTHORIZEENDPOINT'])->delete();
    }
}
