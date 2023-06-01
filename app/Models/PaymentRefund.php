<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRefund extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','refund_id','notes','refund_date','amount', 'refund_type',//0=refund, 1=chargeback
        'merchant_id',
        'brand_id',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function merchant(){
        return $this->belongsTo(Merchant::class);
    }
}
