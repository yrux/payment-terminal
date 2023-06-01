<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubmission extends Model
{
    use HasFactory;
    protected $appends = ['industry_name'];

    protected $fillable = [
        'brand_id',
        'brief_form_id',
        'name',
        'email',
        'phone',
        'name_to_appear',
        'competitors',
        'industry',
        'brief_description',
        'formData'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand_id');
    }
    public function briefform(){
        return $this->belongsTo(BriefForm::class, 'brief_form_id');
    }
    public function getIndustryNameAttribute(){
        $arr = [
            0=> 'No Selection',
            1=>'Aerospace',
            2=>'Transport',
            3=>'Computer',
            4=>'Telecommunication',
            5=>'Agriculture',
            6=>'Construction',
            7=>'Education',
            8=>'Pharmaceutical',
            9=>'Food',
            10=>'Health care',
            11=>'Hospitality',
            12=>'Entertainment',
            13=>'News Media',
            14=>'Energy',
            15=>'Manufacturing',
            16=>'Music',
            17=>'Mining',
            18=>'Worldwide web',
            19=>'Electronics',
            20=>'Others',
        ];
        return $arr[$this->industry];
    }
}
