<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Payment extends Model
{
    use HasFactory;
    protected $appends = ['crypt_key', 'updated_at_formatted', 'inv_number'];
    protected $fillable = [
        'user_id', 'brand_id' ,'payment_gateway','send_invoice', 'description','services','amount','customer_name','customer_email', 'status', 'merchant_customer_id', 'merchant_transaction_id', 'failed_reason', 'sales_email', 'tracking_id',
        'subtotal',
        'allow_tax',
        'tax_percent'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function merchant(){
        return $this->belongsTo(Merchant::class, 'payment_gateway');
    }
    public function history(){
        return $this->hasMany(PaymentHistory::class);
    }
    public function getCryptKeyAttribute(){
        return $this->tracking_id;//Crypt::encrypt($this->id);
    }
    public function getUpdatedAtFormattedAttribute(){
        return date('Y-m-d h:i a',strtotime($this->updated_at));
    }
    public function getInvNumberAttribute(){
        return 'INV-'.sprintf('%06d', $this->id);
    }
}
