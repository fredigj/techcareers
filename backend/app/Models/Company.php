<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    public function recruiters() 
    {
        return $this->hasMany('App\Models\Recruiter', 'user_id');
    }

    public function seekers()
    {
        return $this->belongsToMany('App\Models\Seeker', 'company_seeker', 'company_id', 'user_id', 'id', 'user_id')->withTimestamps();
    }
}
