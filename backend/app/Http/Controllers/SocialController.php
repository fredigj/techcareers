<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use Laravel\Socialite\Facades\Socialite;
use Auth;
use App\Models\User;

class SocialController extends Controller
{

public function redirect()
{
    return Socialite::driver('google')->stateless()->redirect();
}

public function callback()
{
    try {
            $user = Socialite::driver('google')->stateless()->user();
            $user = User::where('google_id', $user->id)->first();

            if($user){
                Auth::login($user);
                return redirect('/home');
            }else{
                $newUser = User::create([
                    'email' => $user->email,
                    'google_id'=> $user->id,
                    'password' => encrypt('123456dummy')
                ]);
                Auth::login($newUser);
                return redirect('/home');
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }
   }
}