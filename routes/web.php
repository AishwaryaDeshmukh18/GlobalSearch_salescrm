<?php

use Illuminate\Support\Facades\Route;

Route::get('/search', function () {
    return view('welcome');
});

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
