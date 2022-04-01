<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    public $table = "EDUCATION";
    
    use HasFactory;

    protected $fillable = [
        'user_id',
        'academic_degree',
        'field_of_study',
        'institution',
        'start_date',
        'end_date',
        'grade'
    ];
}
