<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class PasswordResetController extends Controller
{
    
    public function forgotPassword(Request $request) {
        $input = [
            'email' => $request['email']
        ];

        $rules = [
            'email' => 'required|email'
        ];

        $validation = Validator::make($input, $rules);

        if($validation->fails()) {
            return response([
                'message' => $validation->errors()->all()
            ], 422);
        }

        Password::sendResetLink($request->only('email'));

        return response([
            'message' => 'We have emailed your password reset link!'
        ], 200);
    }

    protected function sendResetResponse(Request $request)
    {
        $input = [
            'password' => $request['password'],
            'password_confirmation' => $request['password_confirmation'],
            'token' => $request['token']
        ];

        $rules = [
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ];

        $validation = Validator::make($input, $rules);

        if($validation->fails()) {
            return response([
                'message' => $validation->errors()->all()
            ], 422);
        }
        
        $userResetCredentials = PasswordReset::all();
        $passwordResetCredential = null;

        foreach($userResetCredentials as $resetCredential) {
            if(Hash::check($request->token, $resetCredential->token)) {
                $passwordResetCredential = $resetCredential;
            }
        }

        if (!$passwordResetCredential || $passwordResetCredential->tokenExpired()) {
            return response()->json( [
               'error'   => true,
               'message' => 'This password reset token is invalid.'
            ], 404);
         }

         $userEmail = PasswordReset::where('token', $passwordResetCredential->token)->pluck('email');

         $user = User::where('email', $userEmail)->first();

         if (!$user) {
            return response()->json( [
               'error'   => true,
               'message' => 'We cannot find a user with that email address'
            ], 404 );
         }
         
         $user->password = bcrypt($request->password);
         $user->save();
         PasswordReset::where('email', $passwordResetCredential->email)->delete();
      
         return response()->json([
            'error' => false,
            'message'=>'Your password changed successfully.'
         ], 200);
    }
}
