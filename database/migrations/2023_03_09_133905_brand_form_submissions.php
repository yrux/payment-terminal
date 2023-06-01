<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\{Permission, RolePermission};

class BrandFormSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('brand_forms_submissions',function(Blueprint $table){
            $table->id();
            $table->foreignId('brand_id')->constrained();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('message')->nullable();
            $table->text('other_fields')->nullable();
            $table->timestamps();
        });
        Permission::create(['name' => 'brandformsubmissions-list','title' => 'brandformsubmissions-list']);
        Permission::create(['name' => 'brandformsubmissions-view','title' => 'brandformsubmissions-view']);
        Permission::create(['name' => 'brandformsubmissions-create','title' => 'brandformsubmissions-create']);
        Permission::create(['name' => 'brandformsubmissions-edit','title' => 'brandformsubmissions-edit']);
        Permission::create(['name' => 'brandformsubmissions-delete','title' => 'brandformsubmissions-delete']);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brandformsubmissions-list')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brandformsubmissions-view')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brandformsubmissions-create')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brandformsubmissions-edit')->first()->id]);
        RolePermission::create(['role_id' => 1, 'permission_id' => Permission::where('name', 'brandformsubmissions-delete')->first()->id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brand_forms_submissions');
    }
}
