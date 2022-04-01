<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationForm extends Model
{
    public $table = "APPLICATION_FORM";

    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'job_post_id',
        'cover_letter_file',
        'cv_file'
    ];
}
