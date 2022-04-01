<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public $table = "PROJECT";

    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'description',
        'url'
    ];
}
