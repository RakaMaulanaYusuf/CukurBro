<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin CukorBro',
            'email' => 'admin@cukorbro.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '081234567890'
        ]);

        User::create([
            'name' => 'Test Customer',
            'email' => 'customer@cukorbro.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => '089876543210'
        ]);
    }
}
