<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileUpdateController extends Controller
{
    public function updateProfile(Request $request) { 
            $user = Auth::user();
            $user->update($request->all());

            return response([
                'message' => 'Profile updated successfully'
            ]);
    }
}
