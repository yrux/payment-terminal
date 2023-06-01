<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBriefFormSubmissionNotes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('brand_form_submission_notes', function (Blueprint $table) {
            $table->id();
            $table->text('note');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('brand_form_submission_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brand_form_submission_notes');
    }
}
