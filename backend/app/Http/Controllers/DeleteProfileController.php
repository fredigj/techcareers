<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DeleteProfileController extends Controller
{
    public function deleteProfile(Request $request) {
        $user = Auth::user();
        if(Hash::check($request['password'], $user->password)) {
            $user->delete();
            Auth::logout();
            return response([
                'message' => 'User permanently deleted'
            ]);
        } else {
            return response([
                'message' => 'Invalid password'
            ], 400);  
        }
    }
}
