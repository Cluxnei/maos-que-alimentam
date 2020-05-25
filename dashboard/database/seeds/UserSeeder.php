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
            'name' => 'Kelvin Cluxnei',
            'email' => 'cluxnei31@gmail.com',
            'cnpj' => '09755495000133',
            'zipcode' => '18021310',
            'street' => 'Ambrozina do Amaral Marchetti',
            'city' => 'Sorocaba',
            'phone' => '13996511446',
            'password' => Hash::make('123')
        ]);
    }
}
