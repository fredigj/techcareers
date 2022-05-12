<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seeker extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'headline',
        'location',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function companies() 
    {
        return $this->belongsToMany('App\Models\Company', 'company_seeker', 'user_id', 'company_id', 'user_id', 'id')->withTimestamps();
    }

    public function skillsets() 
    {
        return $this->belongsToMany('App\Models\Skillset', 'seeker_skillset', 'user_id', 'skillset_id', 'user_id', 'id')->withTimestamps();
    }

    public function experiences()
    {
        return $this->hasMany('App\Models\Experience', 'user_id');
    }

    public function educations()
    {
        return $this->hasMany('App\Models\Education', 'user_id');
    }

    public function awards()
    {
        return $this->hasMany('App\Models\Award', 'user_id');
    }

    public function projects()
    {
        return $this->hasMany('App\Models\Project', 'user_id');
    }

    public function job_posts() 
    {
        return $this->belongsToMany('App\Models\JobPost', 'applications', 'user_id', 'job_post_id', 'user_id', 'id')->withTimestamps();
    }
}
