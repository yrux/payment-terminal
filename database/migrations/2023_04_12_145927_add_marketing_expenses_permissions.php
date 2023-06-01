<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};

class AddMarketingExpensesPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'marketingexpenses-list','title' => 'marketingexpenses-list']);
        Permission::create(['name' => 'marketingexpenses-listmine','title' => 'marketingexpenses-listmine']);
        Permission::create(['name' => 'marketingexpenses-view','title' => 'marketingexpenses-view']);
        Permission::create(['name' => 'marketingexpenses-create','title' => 'marketingexpenses-create']);
        Permission::create(['name' => 'marketingexpenses-edit','title' => 'marketingexpenses-edit']);
        Permission::create(['name' => 'marketingexpenses-delete','title' => 'marketingexpenses-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'marketingexpenses-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'marketingexpenses-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'marketingexpenses-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'marketingexpenses-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'marketingexpenses-delete')->first()->id]);

        //marketing
        RolePermission::create(['role_id' => 6, 'permission_id' => Permission::where('name', 'marketingexpenses-list')->first()->id]);
        RolePermission::create(['role_id' => 6, 'permission_id' => Permission::where('name', 'marketingexpenses-view')->first()->id]);
        RolePermission::create(['role_id' => 6, 'permission_id' => Permission::where('name', 'marketingexpenses-create')->first()->id]);
        // RolePermission::create(['role_id' => 6, 'permission_id' => Permission::where('name', 'marketingexpenses-edit')->first()->id]);

        //buh
        RolePermission::create(['role_id' => 4, 'permission_id' => Permission::where('name', 'marketingexpenses-listmine')->first()->id]);
        RolePermission::create(['role_id' => 4, 'permission_id' => Permission::where('name', 'marketingexpenses-view')->first()->id]);
        RolePermission::create(['role_id' => 4, 'permission_id' => Permission::where('name', 'marketingexpenses-create')->first()->id]);
        // RolePermission::create(['role_id' => 4, 'permission_id' => Permission::where('name', 'marketingexpenses-edit')->first()->id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        RolePermission::where('role_id',1)->where('permission_id',Permission::where('name', 'marketingexpenses-list')->first()->id)->delete();
        RolePermission::where('role_id',1)->where('permission_id',Permission::where('name', 'marketingexpenses-view')->first()->id)->delete();
        RolePermission::where('role_id',1)->where('permission_id',Permission::where('name', 'marketingexpenses-create')->first()->id)->delete();
        RolePermission::where('role_id',1)->where('permission_id',Permission::where('name', 'marketingexpenses-edit')->first()->id)->delete();
        RolePermission::where('role_id',1)->where('permission_id',Permission::where('name', 'marketingexpenses-delete')->first()->id)->delete();

        //marketing
        RolePermission::where('role_id',6)->where('permission_id',Permission::where('name', 'marketingexpenses-list')->first()->id)->delete();
        RolePermission::where('role_id',6)->where('permission_id',Permission::where('name', 'marketingexpenses-view')->first()->id)->delete();
        RolePermission::where('role_id',6)->where('permission_id',Permission::where('name', 'marketingexpenses-create')->first()->id)->delete();
        // RolePermission::where('role_id',6)->where('permission_id',Permission::where('name', 'marketingexpenses-edit')->first()->id)->delete();
        //buh
        RolePermission::where('role_id',4)->where('permission_id',Permission::where('name', 'marketingexpenses-listmine')->first()->id)->delete();
        RolePermission::where('role_id',4)->where('permission_id',Permission::where('name', 'marketingexpenses-view')->first()->id)->delete();
        RolePermission::where('role_id',4)->where('permission_id',Permission::where('name', 'marketingexpenses-create')->first()->id)->delete();
        // RolePermission::where('role_id',4)->where('permission_id',Permission::where('name', 'marketingexpenses-edit')->first()->id)->delete();
        
        Permission::where('name', 'marketingexpenses-list')->delete();
        Permission::where('name', 'marketingexpenses-listmine')->delete();
        Permission::where('name', 'marketingexpenses-view')->delete();
        Permission::where('name', 'marketingexpenses-create')->delete();
        Permission::where('name', 'marketingexpenses-edit')->delete();
        Permission::where('name', 'marketingexpenses-delete')->delete();
    }
}
