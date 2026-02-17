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

    Route::get('dashboard', [FacturaController::class, 'index'])->name('dashboard');
    Route::get('panel', [FacturaController::class, 'panel'])->name('panel');
    Route::resource('facturas', FacturaController::class)->only(['index', 'store', 'update', 'destroy']);
    
});
require __DIR__.'/settings.php';
 