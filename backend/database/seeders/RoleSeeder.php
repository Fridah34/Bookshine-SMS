<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access',
                'level' => 1,
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Can manage classes and students',
                'level' => 2,
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Can view their own data',
                'level' => 3,
            ],
            [
                'name' => 'parent',
                'display_name' => 'Parent/Guardian',
                'description' => 'Can view their children data',
                'level' => 4,
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']], // Match on name
                $role // Update or create with this data
            );
        }

        $this->command->info('Roles seeded successfully!');
    }
}
