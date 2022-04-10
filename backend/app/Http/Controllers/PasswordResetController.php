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
        $request->validate([
            'email' => 'required',
        ]);
        
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

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'user_password' => ['required', 'confirmed', RulesPassword::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'user_password', 'user_password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => "Hash::make($request->user_password)",
                    'remember_token' => Str::random(60),
                ])->save();

                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response([
                'message'=> 'Password reset successfully'
            ]);
        }

        return response([
            'message'=> __($status)
        ], 500);

    }
        
    // protected function sendResetLinkResponse(Request $request)
    // {
    //     $input = $request->only('email');

    //     $validator = Validator::make($input, [
    //         'email' => "required"
    //     ]);

    //     if ($validator->fails()) {
    //         return response(['errors' => $validator->errors()->all()], 422);
    //     }

    //     $response =  Password::sendResetLink($input);

    //     if ($response == Password::RESET_LINK_SENT) {
    //         $message = "Mail send successfully";
    //     } else {
    //         $message = "Email could not be sent to this email address";
    //     }
    //     //$message = $response == Password::RESET_LINK_SENT ? 'Mail send successfully' : GLOBAL_SOMETHING_WANTS_TO_WRONG;
    //     $response = ['data' => '', 'message' => $message];
    //     return response($response, 200);
    // }

    protected function sendResetResponse(Request $request)
    {
        //password.reset
        $input = $request->only('email', 'token', 'user_password', 'user_password_confirmation');
        $validator = Validator::make($input, [
            'token' => 'required',
            'email' => 'required|email',
            'user_password' => 'required|confirmed|min:8',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $response = Password::reset($input, function ($user, $password) {
            $user->forceFill([
                'user_password' => Hash::make($password)
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
