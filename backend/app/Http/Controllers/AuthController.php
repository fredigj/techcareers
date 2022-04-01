<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|unique:USER_ACCOUNT,email',
            'user_password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'user_password' => bcrypt($fields['user_password']),
            'phone_number' => $request['phone_number'],
            'date_of_birth' => $request['date_of_birth'],
            'gender' => $request['gender'],
            'user_image' => $request['user_image'],
            'user_type' => $request['user_type'],
            'is_active' => $request['is_active']
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'user_password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['user_password'], $user->user_password)){
            return response([
                'message' => 'Bad credentials'
            ], 401);
        };

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();        
        return [
            'message' => 'Logged out'
        ];
    }
}
