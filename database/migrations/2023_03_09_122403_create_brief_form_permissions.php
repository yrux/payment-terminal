<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};

class CreateBriefFormPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'briefforms-list','title' => 'briefforms-list']);
        Permission::create(['name' => 'briefforms-view','title' => 'briefforms-view']);
        Permission::create(['name' => 'briefforms-create','title' => 'briefforms-create']);
        Permission::create(['name' => 'briefforms-edit','title' => 'briefforms-edit']);
        Permission::create(['name' => 'briefforms-delete','title' => 'briefforms-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'briefforms-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'briefforms-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'briefforms-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'briefforms-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'briefforms-delete')->first()->id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
