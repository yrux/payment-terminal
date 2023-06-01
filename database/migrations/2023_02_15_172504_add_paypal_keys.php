<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;

class AddPaypalKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        MFlag::create(['flag_type' => 'PAYPALCID','flag_value' => 'AUv8rrc_P-EbP2E0mpb49BV7rFt3Usr-vdUZO8VGOnjRehGHBXkSzchr37SYF2GNdQFYSp72jh5QUhzG', 'is_for_admin'=>1]);
        MFlag::create(['flag_type' => 'PAYPALCS','flag_value' => 'EMnAWe06ioGtouJs7gLYT9chK9-2jJ--7MKRXpI8FesmY_2Kp-d_7aCqff7M9moEJBvuXoBO4clKtY0v', 'is_for_admin'=>1]);
        MFlag::create(['flag_type' => 'PAYPALSANDBOX','flag_value' => '1', 'is_for_admin'=>1]);
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
