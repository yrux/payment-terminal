<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BriefFormBrand extends Model
{
    use HasFactory;
    protected $fillable = [
        'brand_id','brief_form_id'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function briefform(){
        return $this->belongsTo(BriefForm::class);
    }
}
