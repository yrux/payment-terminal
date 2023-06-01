<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};
class AssignPaymentRefundtoAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'paymentrefund-list','title' => 'paymentrefund-list']);
        Permission::create(['name' => 'paymentrefund-view','title' => 'paymentrefund-view']);
        Permission::create(['name' => 'paymentrefund-create','title' => 'paymentrefund-create']);
        Permission::create(['name' => 'paymentrefund-edit','title' => 'paymentrefund-edit']);
        Permission::create(['name' => 'paymentrefund-delete','title' => 'paymentrefund-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'paymentrefund-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'paymentrefund-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'paymentrefund-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'paymentrefund-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'paymentrefund-delete')->first()->id]);
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
