<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;
    // protected $appends = ['json_data'];
    protected $fillable = [
        'name','merchant_type','data'
    ];
    protected $hidden = [
        'data',
    ];
    public function getJsonDataAttribute(){
        return json_decode($this->data);
    }
}
