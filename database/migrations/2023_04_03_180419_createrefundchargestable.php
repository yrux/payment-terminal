<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createrefundchargestable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_refunds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            // $table->string('merchant_customer_id');
            $table->string('refund_id');
            $table->text('notes');
            $table->date('refund_date');
            $table->date('amount');
            $table->tinyInteger('refund_type')->default(0);//0=refund, 1=chargeback
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
        Schema::dropIfExists('payment_refunds');
    }
}
