<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/invoice/estimate', [InvoiceController::class, 'estimate'])->name('invoice.estimate');
    // Route::get('/invoice/print/{invoice}', [InvoiceController::class, 'print'])->name('invoice.print');
    Route::resource('invoice', InvoiceController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('product', ProductController::class);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
