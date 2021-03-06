<?php

use App\Http\Controllers\TweetController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/home', [TweetController::class, 'index'])
        ->name('tweets.index');

    Route::get('/compose/tweet', [TweetController::class, 'create'])
        ->name('tweets.create');

    Route::resource('tweets', TweetController::class)
        ->only(['store', 'destroy']);

    Route::post('/{user:username}/status/{tweet}', [TweetController::class, 'storeReply'])
        ->name('tweets.reply.store');
});

Route::get('/{user:username}/status/{tweet}', [TweetController::class, 'show'])
    ->name('tweets.show');
