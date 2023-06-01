<?php

namespace App\Policies;

use App\Models\PaymentRefund;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PaymentRefundPolicy
{
    use HandlesAuthorization;
    public function viewAny(User $user)
    {
        return optional($user->permissions()->where('name','paymentrefund-list')->first())->id>0;
    }
    public function view(User $user, PaymentRefund $paymentRefund)
    {
        return optional($user->permissions()->where('name','paymentrefund-view')->first())->id>0;
    }
    public function create(User $user)
    {
        return optional($user->permissions()->where('name','paymentrefund-create')->first())->id>0;
    }
    public function update(User $user, PaymentRefund $paymentRefund)
    {
        return optional($user->permissions()->where('name','paymentrefund-edit')->first())->id>0;
    }
    public function delete(User $user, PaymentRefund $paymentRefund)
    {
        return optional($user->permissions()->where('name','paymentrefund-delete')->first())->id>0;
    }
    public function restore(User $user, PaymentRefund $paymentRefund)
    {
        return optional($user->permissions()->where('name','paymentrefund-delete')->first())->id>0;
    }
    public function forceDelete(User $user, PaymentRefund $paymentRefund)
    {
        return optional($user->permissions()->where('name','paymentrefund-delete')->first())->id>0;
    }
}
