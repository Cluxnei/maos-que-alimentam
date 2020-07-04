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
Route::name('api.')->namespace('Api')->group(static function () {
    Route::post('/login', 'UserController@login')->name('login');
    Route::post('/register', 'UserController@register')->name('api.register');
    Route::post('/forgot-password', 'UserController@forgotPassword')->name('forgotPassword');
    Route::name('check.')->prefix('/check')->group(static function () {
        Route::post('/email', 'UserController@checkEmail')->name('email');
        Route::post('/cnpj', 'UserController@checkCNPJ')->name('cnpj');
        Route::post('/phone', 'UserController@checkPhone')->name('phone');
    });
    Route::middleware('auth:api')->group(static function() {
        Route::get('/interests', 'InterestController@index')->name('interests.index');
        Route::post('/interests', 'InterestController@store')->name('interests.store');
        Route::put('/interests/{interest}', 'InterestController@update')->name('interests.update');
        Route::post('/items', 'ItemController@store')->name('items.store');
        Route::get('/items', 'ItemController@index')->name('items.index');
    });
});
