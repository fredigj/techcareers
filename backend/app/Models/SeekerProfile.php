<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeekerProfile extends Model
{
    public $table = "SEEKER_PROFILE";

    use HasFactory;

    protected $fillable = [
        "user_id",
        "first_name",
        "last_name",
        "headline",
        "location",
        "description"
    ];
}
