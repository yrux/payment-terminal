<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;
class AddSettingStripe extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        MFlag::create(['flag_type' => 'STRIPESK','flag_value' => 'sk_test_51JSqHgHF8eu2yoS2dPV4sYjabnJDSYmWl8rrdWtQX2qLHM75YU5lhwuvy9YzlEUEVJTNVsPya7EuU4ivkYZQdKHr008Xet6wUb', 'is_for_admin'=>1]);
        MFlag::create(['flag_type' => 'STRIPEPK','flag_value' => 'pk_test_51JSqHgHF8eu2yoS2dAyCOm1aiE66xUGN30fYGiW2EGTh1Fqu4rNHbE7QSotFjxvYnaBXHkCez6OmoB5LuhKmRzZp00xuutBpXF', 'is_for_admin'=>1]);
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
