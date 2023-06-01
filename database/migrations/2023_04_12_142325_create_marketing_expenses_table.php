<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;
class CreateMarketingExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        MFlag::create([
            'flag_type' => 'MARKETINGSOURCES',
            'flag_value' => 'Bark',
            'is_for_admin' => 1,
        ]);
        MFlag::create([
            'flag_type' => 'MARKETINGSOURCES',
            'flag_value' => 'SMM',
            'is_for_admin' => 1,
        ]);
        MFlag::create([
            'flag_type' => 'MARKETINGSOURCES',
            'flag_value' => 'PPC',
            'is_for_admin' => 1,
        ]);
        MFlag::create([
            'flag_type' => 'MARKETINGSOURCES',
            'flag_value' => 'Upwork Credits',
            'is_for_admin' => 1,
        ]);
        Schema::create('marketing_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('m_flag_id')->constrained();
            $table->date('for_day');
            $table->float('amount')->default(0);
            $table->tinyInteger('request_amendments')->default(0);
            $table->text('amendment_message')->nullable();
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
        Schema::dropIfExists('marketing_expenses');
    }
}
