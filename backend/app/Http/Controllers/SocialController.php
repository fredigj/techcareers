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
                return response(['user' => $user]);
                // return redirect('/');
            }else{
                
                $createUser = User::create([
                    'first_name' => $user->name,
                    'last_name' => 'xxx',
                    'email' => $user->email,
                    'google_id' => $user->id,
                    'date_of_birth' => '2000-01-01',
                    'phone_number' => 'xxx-xxx-xxxx',
                    'user_password' => encrypt('admin@123'),
                    'user_type' => 1
                ]);
    
                Auth::login($createUser);
                // return redirect('/');
            }
            
        } catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }
}