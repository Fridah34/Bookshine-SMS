<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add foreign key to students table
        Schema::table('students', function (Blueprint $table) {
            $table->foreign('class_id')
                  ->references('id')
                  ->on('classes')
                  ->onDelete('set null');
        });

        // Add foreign key to classes table
        Schema::table('classes', function (Blueprint $table) {
            $table->foreign('class_teacher_id')
                  ->references('id')
                  ->on('teachers')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropForeign(['class_id']);
        });

        Schema::table('classes', function (Blueprint $table) {
            $table->dropForeign(['class_teacher_id']);
        });
    }
};