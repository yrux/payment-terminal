<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Country;
class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('country_code', 3);
            $table->string('country_name');
            $table->tinyInteger('is_active')->default(1);
            $table->timestamps();
        });
        $arr = [
            ['USA','United States'],
            ['GBR','United Kingdom'],
            ['CAN','Canada'],
            ['AUS','Australia'],
        ];
        foreach($arr as $ar){
            Country::create([
                'country_code'=>$ar[0],
                'country_name'=>$ar[1],
                'is_active'=> 1
            ]);
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
