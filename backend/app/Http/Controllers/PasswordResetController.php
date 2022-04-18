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
use Illuminate\Support\Facades\DB;
use App\Models\User;

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
         $passwordReset = DB::table('password_resets')->where([
            [ 'token', bcrypt($request->token)],
        ])->first();

         if (!$passwordReset) {
            return response()->json( [
               'error'   => true,
               'message' => 'This Password Reset token is invalid.'
            ], 404 );
         }
         $userEmail = DB::table( 'password_resets' )->where( 'token', $passwordReset->token )->pluck( 'email' );
         $user = User::where( 'email', $userEmail )->first();
         if (!$user) {
            return response()->json( [
               'error'   => true,
               'message' => 'We cannot find a user with that Email Address'
            ], 404 );
         }
         $user->password = bcrypt( $request->password );
         $user->save();
         $passwordReset->delete();
        //  $user->notify( new PasswordResetSuccess( $passwordReset ) );
      
         return response()->json( [
            'error' => false,
            'message'=>'Your Password changed successfully.'
         ] );
    }
}
