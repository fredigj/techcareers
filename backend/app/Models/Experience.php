<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    public $table = "EXPERIENCE";

    use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'start_date',
        'end_date',
        'title',
        'location',
        'description',
        'employment_type'
    ];
}
