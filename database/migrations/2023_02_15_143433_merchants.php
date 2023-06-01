<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};
class Merchants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            //1 = Authorize.net
            //2 = Stripe
            //3 = Paypal
            $table->tinyInteger('merchant_type')->default(1);
            $table->text('data');
            $table->timestamps();
        });
        Permission::create(['name' => 'merchants-list','title' => 'merchants-list']);
        Permission::create(['name' => 'merchants-view','title' => 'merchants-view']);
        Permission::create(['name' => 'merchants-create','title' => 'merchants-create']);
        Permission::create(['name' => 'merchants-edit','title' => 'merchants-edit']);
        Permission::create(['name' => 'merchants-delete','title' => 'merchants-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'merchants-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'merchants-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'merchants-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'merchants-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'merchants-delete')->first()->id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merchants');
    }
}
