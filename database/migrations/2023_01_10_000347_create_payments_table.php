<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('brand_id')->constrained();
            /*
            1 = Stripe
            2 = Authorize.net
            */
            $table->integer('payment_gateway')->default(1);
            $table->tinyInteger('send_invoice')->default(1);
            $table->text('description')->nullable();
            $table->text('services')->nullable();
            $table->float('amount');
            $table->string('customer_name');
            $table->string('customer_email');
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
        Schema::dropIfExists('payments');
    }
}
