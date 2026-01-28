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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('employee_number')->unique();
            $table->string('subject_specialization')->nullable();
            $table->date('hire_date');
            $table->string('qualification')->nullable();
            $table->enum('status', ['active', 'on_leave', 'resigned','withdrawn'])->default('active');
            $table->timestamps();

            // Indexes
            $table->index('user_id');
            $table->index('employee_number');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
