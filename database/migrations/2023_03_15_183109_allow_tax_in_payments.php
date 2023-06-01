<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AllowTaxInPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->float('subtotal');
            $table->tinyInteger('allow_tax')->default(1);
            $table->float('tax_percent')->default(10.25);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('subtotal');
            $table->dropColumn('allow_tax');
            $table->dropColumn('tax_percent');
        });
    }
}
