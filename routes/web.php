<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('login');
});

Route::redirect('/', '/login');

Route::post('/profile', [LoginController::class, 'authenticate']);

Route::post('/getUsers', [AxiosController::class, 'getUsers']);

Route::post('/addUser', [AxiosController::class, 'addUser']);

Route::post('/updateUser', [AxiosController::class, 'updateUser']);

Route::post('/deleteUser', [AxiosController::class, 'deleteUser']);

Route::post('/getTasks', [AxiosController::class, 'getTasks']);

Route::post('/addTask', [AxiosController::class, 'addTask']);

Route::post('/updateTask', [AxiosController::class, 'updateTask']);

Route::post('/deleteTask', [AxiosController::class, 'deleteTask']);
