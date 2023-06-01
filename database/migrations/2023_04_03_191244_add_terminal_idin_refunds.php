<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTerminalIdinRefunds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payment_refunds', function (Blueprint $table) {
            $table->foreignId('merchant_id')->constrained();
            $table->foreignId('brand_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payment_refunds', function (Blueprint $table) {
            $table->dropColumn('merchant_id');
            $table->dropColumn('brand_id');
        });
    }
}
