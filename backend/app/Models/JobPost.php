<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    public $table = "JOB_POST";

    use HasFactory;

    protected $fillable = [
        'id',
        'created_date',
        'description',
        'location',
        'location_type',
        'is_active',
        'seniority_level',
        'pay_range',
        'job_type',
        'employment_type',
        'recruiter_id'
    ];
}
