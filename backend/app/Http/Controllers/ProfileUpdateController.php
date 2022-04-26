<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileUpdateController extends Controller
{
    public function updateProfile(Request $request) { 
            $user = Auth::user();
            $user->update($request->all());

            return response([
                'message' => 'Profile updated successfully'
            ], 204);
    }

    public function changePassword(Request $request) {
        $rules = [
            'current_password' => [
                'required',
                'string',
                'min:8',             // must be at least 10 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'password' => [
                'required',
                'string',
                // 'confirmed',
                'min:8',             // must be at least 10 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
        ];

        $inputs = [            
            'current_password' => bcrypt($request['current_password']),
            'password' => bcrypt($request['password']),
            'password_confirmation' => bcrypt($request['password_confirmation']),
        ];
    
        $validation = Validator::make($inputs, $rules);
    
        if ($validation->fails() ) {
            return response([
                'message' => $validation->errors()->all(),                
            ], 422);
        } else {
            $user = Auth::user();
            if(!Hash::check($request->current_password, $user->password)){
                return response([
                    'message' => 'Current password incorrect'
                ], 400);
            } else {
                if(Hash::check($request['password'], $inputs['password_confirmation'])) {
                    $user->password = bcrypt($request->password);
                    $user->save();
                } else {
                    return response([
                        'message' => 'Passwords do not match'
                    ], 400);                    
                }
            }
        }
        return response([
            'message' => 'Password changed successfully'
        ], 204);                
    }
}
