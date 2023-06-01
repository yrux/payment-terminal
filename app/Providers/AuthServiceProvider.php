<?php

namespace App\Providers;

use App\Policies\{MerchantPolicy, MFlagPolicy, PaymentPolicy, UserPolicy, PermissionPolicy, RolePolicy};
use App\Models\{Merchant, MFlag, Payment, User, Permission, Role};
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        User::class => UserPolicy::class,
        Permission::class => PermissionPolicy::class,
        Role::class => RolePolicy::class,
        MFlag::class => MFlagPolicy::class,
        Payment::class => PaymentPolicy::class,
        Merchant::class => MerchantPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        if (! $this->app->routesAreCached()) {
            // Passport::routes();
            Passport::tokensExpireIn(now()->addDays(15));
            Passport::refreshTokensExpireIn(now()->addDays(30));
            Passport::personalAccessTokensExpireIn(now()->addMonths(6));
        }
        // Gate::guessPolicyNamesUsing(function ($modelClass) {
        //     // Return the name of the policy class for the given model...
        // });
    }
}
