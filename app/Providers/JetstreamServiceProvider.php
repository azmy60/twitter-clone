<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);

        Fortify::loginView(function () {
            Inertia::share('modal', 'components/login/LoginModal');

            return Inertia::render('Welcome');
        });

        Fortify::authenticateUsing(function (Request $request) {
            $user = User::whereIdentifier($request->user_identifier)->first();

            if (
                $user &&
                Hash::check($request->password, $user->password)
            ) {
                return $user;
            }
        });

        Fortify::confirmPasswordsUsing(function ($user, string $password) {
            return Hash::check($password, $user->password);
        });
    }

    /**
     * Configure the permissions that are available within the application.
     *
     * @return void
     */
    protected function configurePermissions()
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
