<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

//use Illuminate\Support\Str;
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
            return response(['message' => $validation->errors()->all()], 422);
        }
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if($status == Password::RESET_LINK_SENT) {
            return [
                'status' => __($status)
            ];
        }
        
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    protected function sendResetResponse(Request $request)
    {
        $input = $request->only('email', 'token', 'password', 'password_confirmation');

        $validator = Validator::make($input, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $response = Password::reset($input, function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->save();
            //$user->setRememberToken(Str::random(60));
            event(new PasswordReset($user));
        });
        if ($response == Password::PASSWORD_RESET) {
            $message = "Password reset successfully";
        } else {
            $message = "Email could not be sent to this email address";
        }
        $response = ['data' => '', 'message' => $message];
        return response()->json($response);
    }
}
