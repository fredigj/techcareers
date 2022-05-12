<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'location',
        'location_type',
        'seniority_level',
        'pay_range',
        'job_type',
        'employment_type',
        'skillsets'
    ];

    public function recruiter()
    {
        return $this->belongsTo('App\Models\Recruiter', 'user_id');
    }

    public function skillsets() 
    {
        return $this->belongsToMany('App\Models\Skillset', 'job_post_skillsets', 'job_post_id', 'skillset_id', 'id', 'id')->withTimestamps();
    }

    public function seekers()
    {
        return $this->belongsToMany('App\Models\Seeker', 'applications', 'job_post_id', 'user_id', 'id', 'user_id')->withTimestamps();
    }
}
