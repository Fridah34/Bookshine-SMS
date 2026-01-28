<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Grade 1A, Form 4B
            $table->integer('level'); // 1-12
            $table->string('section')->nullable(); // A, B, C
            $table->year('academic_year');
            $table->foreignId('class_teacher_id')->nullable()->constrained('teachers')->onDelete('set null');
            $table->integer('capacity')->default(40);
            $table->timestamps();

             // Indexes
            $table->index('name');
            $table->index('level');
            $table->index('academic_year');
            $table->index('class_teacher_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
