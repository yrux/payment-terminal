<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandMerchant extends Model
{
    use HasFactory;
    protected $fillable = [
        'brand_id','merchant_id'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function merchant(){
        return $this->belongsTo(Merchant::class);
    }
}
