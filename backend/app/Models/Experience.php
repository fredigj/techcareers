<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'title',
        'location',
        'description',
        'employment_type',
        'is_current',
        'start_date',
        'end_date'
    ];

    public function seeker()
    {
        return $this->belongsTo('App\Models\Seeker', 'user_id');
    }
}
