<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketingExpense extends Model
{
    use HasFactory;
    protected $appends = ['invoice_url'];
    protected $fillable = [
        'brand_id',
        'user_id',
        'm_flag_id',
        'for_day',
        'amount',
        'request_amendments',
        'amendment_message',
        'additional_fee',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function source(){
        return $this->belongsTo(MFlag::class,'m_flag_id');
    }
    public function invoice(){
        return $this->morphOne(File::class,'fileable');
    }
    public function getInvoiceUrlAttribute(){
        if($this->invoice){
            return asset($this->invoice->url);
        }else{
            return '';
        }
    }
}
