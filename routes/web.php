<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Service;
use App\Models\Barber;
use App\Models\Gallery;
use App\Models\Testimonial;

Route::get('/', function () {
    $bookings = auth()->check() ? auth()->user()->bookings()->with(['barber'])->latest()->get() : [];

    return Inertia::render('Welcome', [
        'services' => Service::where('is_active', true)->get(),
        'barbers' => Barber::where('is_active', true)->get(),
        'gallery' => Gallery::latest()->take(12)->get(),
        'testimonials' => Testimonial::where('is_featured', true)->get(),
        'bookings' => $bookings,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/api/available-slots', [App\Http\Controllers\BookingController::class, 'availableSlots']);

use App\Http\Controllers\Auth\SocialiteController;
Route::get('/auth/google', [SocialiteController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialiteController::class, 'callback'])->name('google.callback');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\CustomerController::class, 'dashboard'])->name('dashboard');
    Route::post('/book', [App\Http\Controllers\BookingController::class, 'store'])->name('book');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BarberController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\UserController;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('barbers', BarberController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('bookings', BookingController::class);
    Route::resource('gallery', GalleryController::class);
});
