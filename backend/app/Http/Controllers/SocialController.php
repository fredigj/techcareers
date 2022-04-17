<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Socialite;
use Exception;
use Auth;
use Barryvdh\Debugbar\Facades\Debugbar;

class SocialController extends Controller
{
    public function redirect()
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function callback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
            $isUser = User::where('google_id', $user->id)->first();
            Debugbar::error($user);
            if($isUser){
                Auth::login($isUser);
                return response([
                    'user' => $user,
                    'registered' => true
                ]);
            }else{
                return response([
                    'user' => $user,
                    'registered' => false
                ]);
            }
            
        } catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }
}