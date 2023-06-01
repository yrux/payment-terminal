<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;

class AlterFlagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('m_flags',function(Blueprint $table){
            $table->tinyInteger('is_for_admin')->default(0);
        });
        MFlag::whereIn('flag_type' ,['AUTHORIZELOGINID','AUTHORIZETRANSACTIONKEY','AUTHORIZEENDPOINT'])->update([
            'is_for_admin' => 1
        ]);
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
