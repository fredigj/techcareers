<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class passwordreset extends Model
{
    use HasFactory;
    public $table = "password_resets";

    public function tokenExpired() {
        if (Carbon::parse($this->created_at)->addHour() < Carbon::now()) {
            return true;
        }
        return false;
    }
}