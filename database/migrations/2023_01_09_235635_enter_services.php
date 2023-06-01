<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MFlag;
class EnterServices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $arr = [
            'Website Development',
            'Website Design',
            'Social Media Marketing',
            'Social Media Design',
            'SEO Services',
            'SEO Questionnaire',
            'Other Services',
            'No Package',
            'Logo Design',
            'Google Paid Services',
            'Email Marketing',
            'Content Marketing',
            'Amazon SEO Services',
        ];
        foreach($arr as $ar){
            MFlag::create([
                'flag_type' => 'SERVICESTYPES',
                'flag_value' => $ar,
                'is_for_admin' =>0
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
        MFlag::where('flag_type', 'SERVICESTYPES')->delete();
    }
}
