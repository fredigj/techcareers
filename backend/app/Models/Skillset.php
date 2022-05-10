<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skillset extends Model
{
    use HasFactory;

    public function seekers()
    {
        return $this->belongsToMany('App\Models\Seeker', 'seeker_skillsets', 'skillset_id', 'user_id', 'id', 'user_id')->withTimestamps();
    }

    public function job_posts()
    {
        return $this->belongsToMany('App\Models\JobPost', 'job_post_skillsets', 'skillset_id', 'job_post_id', 'id', 'id')->withTimestamps();
    }
}
