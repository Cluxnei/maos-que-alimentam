<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('item_id');
            $table->foreignId('unit_id');
            $table->unsignedSmallInteger('quantity');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('item_id')->references('id')->on('items');
            $table->foreign('unit_id')->references('id')->on('units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('interests', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('item_id');
            $table->dropForeign('unit_id');
        });
        Schema::dropIfExists('interests');
    }
}
