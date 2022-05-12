<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_of_study',
        'institution',
        'degree',
        'grade',
        'start_date',
        'end_date'
    ];

    public function seeker()
    {
        return $this->belongsTo('App\Models\Seeker', 'user_id');
    }
}
