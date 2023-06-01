<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};
class InsertPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'm_flag-list','title' => 'm_flag-list']);
        Permission::create(['name' => 'm_flag-view','title' => 'm_flag-view']);
        Permission::create(['name' => 'm_flag-create','title' => 'm_flag-create']);
        Permission::create(['name' => 'm_flag-edit','title' => 'm_flag-edit']);
        Permission::create(['name' => 'm_flag-delete','title' => 'm_flag-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'm_flag-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'm_flag-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'm_flag-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'm_flag-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'm_flag-delete')->first()->id]);
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
