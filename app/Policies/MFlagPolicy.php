<?php

namespace App\Policies;

use App\Models\MFlag;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MFlagPolicy
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
        return optional($user->permissions()->where('name','m_flag-list')->first())->id>0;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, MFlag $mFlag)
    {
        return optional($user->permissions()->where('name','m_flag-view')->first())->id>0;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return optional($user->permissions()->where('name','m_flag-create')->first())->id>0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, MFlag $mFlag)
    {
        return optional($user->permissions()->where('name','m_flag-edit')->first())->id>0;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, MFlag $mFlag)
    {
        return optional($user->permissions()->where('name','m_flag-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, MFlag $mFlag)
    {
        return optional($user->permissions()->where('name','m_flag-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MFlag  $mFlag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, MFlag $mFlag)
    {
        return optional($user->permissions()->where('name','m_flag-delete')->first())->id>0;
    }
}
