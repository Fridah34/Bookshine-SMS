<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
Use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=> 'Admin User',
            'email'=> 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);

        User::create([
            'name'=> 'Teacher User',
            'email'=> 'teacher@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher'
        ]);

        User::create([
            'name'=> 'Student User',
            'email'=> 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student'
        ]);
    }
}
