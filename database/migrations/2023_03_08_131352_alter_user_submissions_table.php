<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUserSubmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        try{
            Schema::table('user_submissions',function(Blueprint $table){
                $table->string('phone');
            });
        }catch(\Exception $ex){}
        try{
            Schema::table('brands',function(Blueprint $table){
                $table->text('brief_notification_emails');
            });
        }catch(\Exception $ex){}
        try{
            Schema::table('payments',function(Blueprint $table){
                $table->uuid('tracking_id');
            });
        }catch(\Exception $ex){}
        try{
        Schema::create('user_targets',function(Blueprint $table){
            $table->foreignId('user_id')->constrained();
            $table->date('target_date');
            $table->float('target_amount');
        });
        }catch(\Exception $ex){}
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_submissions',function(Blueprint $table){
            $table->dropColumn('phone');
        });
        Schema::table('brands',function(Blueprint $table){
            $table->dropColumn('brief_notification_emails');
        });
        Schema::table('payments',function(Blueprint $table){
            $table->dropColumn('tracking_id');
        });
        Schema::dropIfExists('user_targets');
    }
}
