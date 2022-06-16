<?php

namespace Tests\Feature;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TweetTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_index_screen_can_be_rendered()
    {
        $this->withoutExceptionHandling();
        $response = $this->get('/home');

        $response->assertStatus(200);
    }

    public function test_create_screen_can_be_rendered()
    {
        $response = $this->get('/compose/tweet');

        $response->assertStatus(200);
    }

    public function test_user_can_post_tweets()
    {
        $this->post('/tweets', [
            'text' => 'top energy GIGACHAD',
        ]);

        $this->assertEquals(Tweet::count(), 1);
    }

    public function test_user_can_delete_tweets()
    {
        $tweet = Tweet::factory()->create([
            'user_id' => $this->user->id
        ]);

        $this->delete('/tweets/' . $tweet->id);

        $this->assertEquals(Tweet::count(), 0);
    }

    public function test_user_cannot_delete_other_tweets()
    {
        $tweet = Tweet::factory()->create();

        $this->delete('/tweets/' . $tweet->id);

        $this->assertEquals(Tweet::count(), 1);
    }
}
