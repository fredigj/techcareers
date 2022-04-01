<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public $table = "COMPANY";

    use HasFactory;

    protected $fillable = [
        'id',
        'short_description',
        'company_name',
        'image',
        'long_description',
        'email',
        'establishment_year',
        'website_url',
        'followers_count',
        'company_size'
    ];
}
