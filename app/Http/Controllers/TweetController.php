<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTweetRequest;
use App\Models\Tweet;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TweetController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Tweet::class, 'tweet');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // dd('hi');
        return Inertia::render('Home', [
            'tweets' => Tweet::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Inertia::share('modal', 'Tweet/TweetComposeModal');

        return $this->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTweetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTweetRequest $request)
    {
        Tweet::create(array_merge($request->validated(), [
            'user_id' => Auth::id(),
        ]));

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function show(Tweet $tweet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tweet $tweet)
    {
        $tweet->deleteOrFail();

        return redirect()->back();
    }
}
