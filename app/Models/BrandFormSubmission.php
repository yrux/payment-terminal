<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandFormSubmission extends Model
{
    use HasFactory;
    protected $appends = ['created_at_formatted'];
    protected $with = ['notes'];
    protected $fillable = [
        'name','email', 'phone', 'message', 'other_fields', 'brand_id'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function getCreatedAtFormattedAttribute(){
        return date('l, F d, Y \a\t h:i a', strtotime($this->created_at));
    }
    public function notes(){
        return $this->hasMany(BrandFormSubmissionNote::class);
    }
}
