<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User Management
            ['name' => 'view-users', 'display_name' => 'View Users', 'module' => 'users'],
            ['name' => 'create-users', 'display_name' => 'Create Users', 'module' => 'users'],
            ['name' => 'edit-users', 'display_name' => 'Edit Users', 'module' => 'users'],
            ['name' => 'delete-users', 'display_name' => 'Delete Users', 'module' => 'users'],

            // Student Management
            ['name' => 'view-students', 'display_name' => 'View Students', 'module' => 'students'],
            ['name' => 'create-students', 'display_name' => 'Create Students', 'module' => 'students'],
            ['name' => 'edit-students', 'display_name' => 'Edit Students', 'module' => 'students'],
            ['name' => 'delete-students', 'display_name' => 'Delete Students', 'module' => 'students'],

            // Teacher Management
            ['name' => 'view-teachers', 'display_name' => 'View Teachers', 'module' => 'teachers'],
            ['name' => 'create-teachers', 'display_name' => 'Create Teachers', 'module' => 'teachers'],
            ['name' => 'edit-teachers', 'display_name' => 'Edit Teachers', 'module' => 'teachers'],
            ['name' => 'delete-teachers', 'display_name' => 'Delete Teachers', 'module' => 'teachers'],

            // Class Management
            ['name' => 'view-classes', 'display_name' => 'View Classes', 'module' => 'classes'],
            ['name' => 'create-classes', 'display_name' => 'Create Classes', 'module' => 'classes'],
            ['name' => 'edit-classes', 'display_name' => 'Edit Classes', 'module' => 'classes'],
            ['name' => 'delete-classes', 'display_name' => 'Delete Classes', 'module' => 'classes'],

            // Grades Management
            ['name' => 'view-grades', 'display_name' => 'View Grades', 'module' => 'grades'],
            ['name' => 'edit-grades', 'display_name' => 'Edit Grades', 'module' => 'grades'],
            ['name' => 'view-own-grades', 'display_name' => 'View Own Grades', 'module' => 'grades'],

            // Attendance Management
            ['name' => 'view-attendance', 'display_name' => 'View Attendance', 'module' => 'attendance'],
            ['name' => 'mark-attendance', 'display_name' => 'Mark Attendance', 'module' => 'attendance'],
            ['name' => 'view-own-attendance', 'display_name' => 'View Own Attendance', 'module' => 'attendance'],

            // Reports
            ['name' => 'view-reports', 'display_name' => 'View Reports', 'module' => 'reports'],
            ['name' => 'generate-reports', 'display_name' => 'Generate Reports', 'module' => 'reports'],

            // Settings
            ['name' => 'manage-settings', 'display_name' => 'Manage Settings', 'module' => 'settings'],
            ['name' => 'manage-roles', 'display_name' => 'Manage Roles', 'module' => 'settings'],
            ['name' => 'manage-permissions', 'display_name' => 'Manage Permissions', 'module' => 'settings'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']], // Match on name
                $permission // Update or create with this data
            );
        }

        $this->command->info('Permissions seeded successfully!');
    }
}
