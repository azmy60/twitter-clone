<?php

namespace Tests\Feature;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_profile_screen_can_be_rendered()
    {
        $user = User::factory()->create();
        $response = $this->get('/' . $user->username);

        $response->assertStatus(200);
    }

    public function test_user_profile_tweets_can_be_rendered()
    {
        $user = User::factory()->create();

        Tweet::factory()->for($user)->create();
        Tweet::factory()->create();

        $response = $this->get('/' . $user->username);

        $response->assertInertia(fn (Assert $page) => $page
            ->has('tweets', 1));
    }
}
