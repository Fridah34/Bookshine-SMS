<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;


class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Admin gets all permissions
        $adminRole = Role::where('name', 'admin')->first();
        $allPermissions = Permission::all();
        $adminRole->permissions()->sync($allPermissions->pluck('id'));

        // Teacher permissions
        $teacherRole = Role::where('name', 'teacher')->first();
        $teacherPermissions = Permission::whereIn('name', [
            'view-students',
            'edit-students',
            'view-classes',
            'view-grades',
            'edit-grades',
            'view-attendance',
            'mark-attendance',
            'view-reports',
        ])->get();
        $teacherRole->permissions()->sync($teacherPermissions->pluck('id'));

        // Student permissions
        $studentRole = Role::where('name', 'student')->first();
        $studentPermissions = Permission::whereIn('name', [
            'view-own-grades',
            'view-own-attendance',
        ])->get();
        $studentRole->permissions()->sync($studentPermissions->pluck('id'));

        // Parent permissions
        $parentRole = Role::where('name', 'parent')->first();
        $parentPermissions = Permission::whereIn('name', [
            'view-students', // Only their children
            'view-grades', // Only their children's grades
            'view-attendance', // Only their children's attendance
        ])->get();
        $parentRole->permissions()->sync($parentPermissions->pluck('id'));
    }
}
