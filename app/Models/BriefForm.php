<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BriefForm extends Model
{
    use HasFactory;
    protected $fillable = [
        'name','formData','is_active'
    ];
    public function brands(){
        return $this->hasManyThrough(Brand::class, BriefFormBrand::class, 'brief_form_id', 'id','id', 'brand_id');
    }
}
