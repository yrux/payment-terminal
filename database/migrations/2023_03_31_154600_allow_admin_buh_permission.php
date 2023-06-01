<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};
class AllowAdminBuhPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create(['name' => 'usertarget-buh','title' => 'Allow Admin to Assign target to buh']);
        Permission::create(['name' => 'usertarget-sales','title' => 'Allow User to Assign Target to their team']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'usertarget-buh')->first()->id]);
        RolePermission::create(['role_id' => 4, 'permission_id' => Permission::where('name', 'usertarget-sales')->first()->id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        RolePermission::whereIn('permission_id', [
            Permission::where('name', 'usertarget-buh')->first()->id,
            Permission::where('name', 'usertarget-sales')->first()->id
        ])->delete();
        Permission::whereIn('name', [
            'usertarget-buh','usertarget-sales',
        ])->delete();
    }
}
