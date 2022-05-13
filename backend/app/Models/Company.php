<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company_image',
        'short_description',
        'long_description',
        'email',
        'establishment_year',
        'website_url',
        'location',
        'company_size'
    ];

    public function recruiters() 
    {
        return $this->hasMany('App\Models\Recruiter', 'user_id');
    }

    public function seekers()
    {
        return $this->belongsToMany('App\Models\Seeker', 'company_seeker', 'company_id', 'user_id', 'id', 'user_id')->withTimestamps();
    }
}
