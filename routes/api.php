<?php

use App\Models\User;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login/onboarding', function (Request $request) {
    $request->validate(['user_identifier' => 'required|string']);

    if (User::whereIdentifier($request->user_identifier)->doesntExist()) {
        return response(['error' => 'Sorry, we could not find your account.'], 400);
    }

    return response(['status' => 'success']);
})->name('login.onboarding');
