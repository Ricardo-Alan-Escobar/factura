<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\FacturaController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', [FacturaController::class, 'index'])
        ->name('dashboard');

    Route::post('/facturas', [FacturaController::class, 'store'])
        ->name('facturas.store');
});

require __DIR__.'/settings.php';
