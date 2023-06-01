<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\Merchant;
use App\Models\User;

class MerchantPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return optional($user->permissions()->where('name','merchants-list')->first())->id>0;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Merchant $merchant)
    {
        return optional($user->permissions()->where('name','merchants-view')->first())->id>0;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return optional($user->permissions()->where('name','merchants-create')->first())->id>0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Merchant $merchant)
    {
        return optional($user->permissions()->where('name','merchants-edit')->first())->id>0;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Merchant $merchant)
    {
        return optional($user->permissions()->where('name','merchants-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Merchant $merchant)
    {
        return optional($user->permissions()->where('name','merchants-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Merchant $merchant)
    {
        return optional($user->permissions()->where('name','merchants-delete')->first())->id>0;
    }
}
