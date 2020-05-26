<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::name('api.')->group(static function () {
    Route::post('/login', 'Api\UserController@login')->name('login');
    Route::post('/register', 'Api\UserController@register')->name('register');
    Route::post('/forgot-password', 'Api\UserController@forgotPassword')->name('forgotPassword');
    Route::name('check.')->prefix('/check')->group(static function () {
        Route::post('/email', 'Api\UserController@checkEmail')->name('email');
        Route::post('/cnpj', 'Api\UserController@checkCNPJ')->name('cnpj');
        Route::post('/phone', 'Api\UserController@checkPhone')->name('phone');
    });
});
