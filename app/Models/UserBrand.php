<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBrand extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'brand_id',
        'user_id',
        'pseudo_name',
        'pseudo_email',
    ];
}
