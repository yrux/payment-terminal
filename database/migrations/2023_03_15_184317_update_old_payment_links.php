<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class UpdateOldPaymentLinks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // DB::statement('update payments set subtotal=total, tax_percent=0,allow_tax=0');
        Payment::
        where('id', '>', 0)->update([
            'subtotal' => DB::raw('amount'),
            'tax_percent' => 0,
            'allow_tax' => 0,
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
