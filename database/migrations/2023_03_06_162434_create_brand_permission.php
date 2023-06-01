<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};
class CreateBrandPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'brands-list','title' => 'brands-list']);
        Permission::create(['name' => 'brands-view','title' => 'brands-view']);
        Permission::create(['name' => 'brands-create','title' => 'brands-create']);
        Permission::create(['name' => 'brands-edit','title' => 'brands-edit']);
        Permission::create(['name' => 'brands-delete','title' => 'brands-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brands-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brands-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brands-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brands-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brands-delete')->first()->id]);
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
