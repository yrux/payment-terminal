<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Country;
class AlterCountryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('countries',function(Blueprint $table){
            $table->string('iso_code',2)->nullable();
        });
        Country::where('id', 1)->update([
            'iso_code' => 'US'
        ]);
        Country::where('id', 2)->update([
            'iso_code' => 'UK'
        ]);
        Country::where('id', 3)->update([
            'iso_code' => 'CA'
        ]);
        Country::where('id', 4)->update([
            'iso_code' => 'AU'
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('countries',function(Blueprint $table){
            $table->dropColumn('iso_code');
        });
    }
}
