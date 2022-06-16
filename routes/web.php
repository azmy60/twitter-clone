<?php

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/register/unique-email', function (Request $request) {
    abort_if(User::whereIdentifier($request->email)->exists(), 400);
})->name('register.unique-email');

Route::post('/register/unique-username', function (Request $request) {
    abort_if(User::whereIdentifier($request->username)->exists(), 400);
})->name('register.unique-username');

require __DIR__ . '/tweets.php';

Route::get('/{username}', function ($username) {
    $user = User::whereIdentifier($username)->first();

    abort_unless($user, 404, 'This user does not exist');

    return Inertia::render('UserProfile', [
        'user' => $user,
        'tweets' => $user->tweets,
    ]);
});
