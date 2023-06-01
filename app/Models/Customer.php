<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'city',
        'state',
        'zip_code',
        'address',
        'phone',
        'address_two',
        'country_id',
        'authorize_id',
        'stripe_id',
    ];
}
