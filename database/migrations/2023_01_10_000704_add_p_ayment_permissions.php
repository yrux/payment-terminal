<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};

class AddPAymentPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'payment-list','title' => 'payment-list']);
        Permission::create(['name' => 'payment-view','title' => 'payment-view']);
        Permission::create(['name' => 'payment-create','title' => 'payment-create']);
        Permission::create(['name' => 'payment-edit','title' => 'payment-edit']);
        Permission::create(['name' => 'payment-delete','title' => 'payment-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'payment-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'payment-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'payment-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'payment-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'payment-delete')->first()->id]);
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
