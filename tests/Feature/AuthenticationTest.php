<?php

namespace Tests\Feature;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login/onboarding', [
            'user_identifier' => $user->email,
        ]);

        $response->assertJson([
            'status' => 'success',
        ]);
    }

    public function test_users_can_not_onboard_with_invalid_identifier()
    {
        $response = $this->postJson('/api/login/onboarding', [
            'user_identifier' => 'notexist',
        ]);

        $response->assertJson([
            'error' => 'Sorry, we could not find your account.',
        ]);
    }

    public function test_users_can_authenticate_with_email()
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'user_identifier' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_users_can_authenticate_with_username()
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'user_identifier' => $user->username,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'user_identifier' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
}
