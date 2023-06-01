<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MFlag extends Model
{
    use HasFactory;
    protected $fillable = [
        'flag_type','flag_value', 'is_for_admin'
    ];
}
