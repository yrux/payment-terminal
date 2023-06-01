<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\MarketingExpense;
use App\Models\User;

class MarketingExpensePolicy
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
        return optional($user->permissions()->where('name','marketingexpenses-list')->first())->id>0;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewMine(User $user)
    {
        return optional($user->permissions()->where('name','marketingexpenses-listmine')->first())->id>0;
    }   

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BrandFormSubmission  $brandFormSubmission
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, MarketingExpense $marketingExpense)
    {
        return optional($user->permissions()->where('name','marketingexpenses-view')->first())->id>0;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return optional($user->permissions()->where('name','marketingexpenses-create')->first())->id>0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BrandFormSubmission  $brandFormSubmission
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, MarketingExpense $marketingExpense)
    {
        return optional($user->permissions()->where('name','marketingexpenses-edit')->first())->id>0;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BrandFormSubmission  $brandFormSubmission
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, MarketingExpense $marketingExpense)
    {
        return optional($user->permissions()->where('name','marketingexpenses-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BrandFormSubmission  $brandFormSubmission
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, MarketingExpense $marketingExpense)
    {
        return optional($user->permissions()->where('name','marketingexpenses-delete')->first())->id>0;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BrandFormSubmission  $brandFormSubmission
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, MarketingExpense $marketingExpense)
    {
        return optional($user->permissions()->where('name','marketingexpenses-delete')->first())->id>0;
    }
}
