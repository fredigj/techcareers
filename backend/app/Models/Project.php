<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function seeker()
    {
        return $this->belongsTo('App\Models\Seeker', 'user_id');
    }
}
