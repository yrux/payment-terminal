<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Role, RolePermission, Permission};
class CreateQARole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $roleId = Role::create([
            'name' => 'Marketing',
            'title' => 'Marketing'
        ]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'brandformsubmissions-list')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'brandformsubmissions-view')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'brandformsubmissions-create')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'brandformsubmissions-edit')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'brandformsubmissions-delete')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'briefforms-list')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'briefforms-view')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'briefforms-create')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'briefforms-edit')->first()->id]);
        RolePermission::create(['role_id' => $roleId, 'permission_id' => Permission::where('name', 'briefforms-delete')->first()->id]);
    }
    public function down()
    {
        $roleId = Role::where('title','Marketing')->first();
        RolePermission::where('role_id', $roleId)->delete();
        Role::where('title','Marketing')->delete();
    }
}
