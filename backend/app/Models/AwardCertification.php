<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardCertification extends Model
{
    public $table = "AWARD_CERTIFICATION";

    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'issue_date',
        'institution',
        'expiry_date'    
    ];
}
