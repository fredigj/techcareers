<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\MailResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'date_of_birth',
        'gender',
        'user_image',
        'user_type',
    ];

    protected $hidden = [
        'password',
    ];
    
    public function seeker() 
    {
        return $this->hasOne('App\Models\Seeker');
    }

    public function recruiter() 
    {
        return $this->hasOne('App\Models\Recruiter');
    }

    public function sendPasswordResetNotification($token)
    {
        $url = 'http://localhost:3000/reset-password/' . $token;

        $this->notify(new MailResetPasswordNotification($url));
    }
}
