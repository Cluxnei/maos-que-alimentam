<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Dev Developer',
            'email' => 'dev@dev.dev',
            'cnpj' => '09755495000133',
            'zipcode' => '18021310',
            'street' => 'Devlandia coders',
            'city' => 'Programing Language',
            'phone' => '01010101010',
            'password' => Hash::make('dev')
        ]);
    }
}
