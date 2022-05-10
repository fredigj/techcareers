<?php

namespace App\Http\Controllers;

use App\Models\Recruiter;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Seeker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        if($request->has('google_id')){
            $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*#?&";
            $password = substr(str_shuffle($chars),0,16);
             
            $request->merge([
                'password' => $password,
                'password_confirmation' => $password
            ]);
        }

        $rules = [
            'email'    => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                // 'confirmed',
                'min:8',             // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|string',
            'gender' => 'required',
        ];

        $inputs = [
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'password' => $request['password'],
            // 'password_confirmation' => bcrypt($request['password_confirmation']),
            'phone_number' => $request['phone_number'],
            'date_of_birth' => $request['date_of_birth'],
            'gender' => $request['gender'],
            'user_image' => $request['user_image'],
            'user_type' => $request['user_type'],
            'is_active' => $request['is_active'],
            'google_id' => $request['google_id']
        ];
    
        $validation = Validator::make($inputs, $rules );
    
        if ($validation->fails() ) {
            return response([
                'message' => $validation->errors()->all(),                
            ], 422);
        } else {
            $user = new User();
            $user->first_name = $request['first_name'];
            $user->last_name = $request['last_name'];
            $user->email = $request['email'];
            $user->password = bcrypt($request['password']);
            $user->phone_number = $request['phone_number'];
            $user->date_of_birth = $request['date_of_birth'];
            $user->gender = $request['gender'];
            
            if($request->hasFile('user_image')) {
                $file = $request->file('user_image');
                $extension = $file->getClientOriginalExtension();

                $filename = time().'.'.$extension;
                $file->move('uploads/user_images/', $filename);
                $user->user_image = 'uploads/user_images/'.$filename;
            }
        
            $user->user_type = $request['user_type'];
            $user->is_active = $request['is_active'];
            $user->google_id = $request['google_id'];
            $user->save();

            if($user->user_type == 1) {
                $seeker = new Seeker();
                $user->seeker()->save($seeker);
            }
            
            if($user->user_type == 2) {
                $recruiter = new Recruiter();
                $user->recruiter()->save($recruiter);
            }

            $token = $user->createToken('myapptoken')->plainTextToken;
    
            return response([
                'user' => $user,
                'token' => $token
            ], 201);
        }

    }

    public function login(Request $request) {
        $rules = [
            'email'    => 'required|email',
            'password' => [
                'required',
                'string',
                'min:8',             // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
        ];

        $inputs = [
            'email'    => $request['email'],
            'password' => $request['password'],
        ];
    
        $validation = Validator::make($inputs, $rules );
    
        if ($validation->fails() ) {
            return response([
                'message' => $validation->errors()->all(),                
            ], 422);
        } else {
            // Check email
            $user = User::where('email', $request['email'])->first();
    
            // Check password
            if(!$user || !Hash::check($request['password'], $user->password)){
                return response([
                    'message' => 'Bad credentials'
                ], 401);
            };
    
            $token = $user->createToken('myapptoken')->plainTextToken;
    
            return response([
                'user' => $user,
                'token' => $token
            ], 201);
        }
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();        
        return response([
            'message' => 'Logged out'
        ], 200);
    }
}
