<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'System Administrator',
            'email' => 'admin@bookshine.com',
            'password' => Hash::make('password'),
            'phone' => '+254700000000',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $adminRole = Role::where('name', 'admin')->first();
        
        if ($adminRole && !$admin->hasRole('admin')) {
            $admin->assignRole($adminRole);
        }

        $this->command->info('Admin user created: admin@bookshine.com / password');
    }
}
