<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandFormSubmissionNote extends Model
{
    use HasFactory;
    protected $fillable = [
        'note','user_id','brand_form_submission_id'
    ];
    protected $with = ['user'];
    public function submission(){
        return $this->belongsTo(BrandFormSubmission::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
