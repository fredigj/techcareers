<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ProfileUpdateController;
use App\Http\Controllers\SocialController;
use PhpParser\Node\Expr\FuncCall;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public APIs
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Forget, Reset
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/reset', [PasswordResetController::class, 'sendResetResponse']);
// Sign In with Google
Route::get('auth/google', [SocialController::class, 'redirect']);
Route::get('auth/google/callback', [SocialController::class, 'callback']);


// Temporary public APIs
Route::post('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::post('users/search/{email}', [UserController::class, 'search']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::put('/update-profile', [ProfileUpdateController::class, 'updateProfile']);
    Route::post('/change-password', [ProfileUpdateController::class, 'changePassword']);
    Route::post('/users', [UserController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
