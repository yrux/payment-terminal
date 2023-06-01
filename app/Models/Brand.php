<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $appends = ['image_url', 'brief_notification_emails_array'];
    protected $fillable = [
        'name','url', 'terms_and_conditions','brief_notification_emails',
    ];
    protected $with = ['merchants'];
    public function image(){
        return $this->morphOne(File::class,'fileable');
    }
    public function merchants(){
        return $this->hasManyThrough(Merchant::class, BrandMerchant::class, 'brand_id', 'id','id', 'merchant_id');
    }
    public function getImageUrlAttribute(){
        if($this->image){
            return asset($this->image->url);
        }else{
            return 'https://randomuser.me/api/portraits/men/85.jpg';
        }
    }
    public function getBriefNotificationEmailsArrayAttribute(){
        return explode(',', $this->brief_notification_emails);
    }
    public function briefforms(){
        return $this->hasManyThrough(BriefForm::class, BriefFormBrand::class, 'brand_id', 'id','id', 'brief_form_id')->orderBy('sort_order','asc');
    }
}
