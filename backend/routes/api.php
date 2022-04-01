<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('register', [UserController::class, 'store']);

Route::post('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);

Route::post('users/search/{email}', [UserController::class, 'search']);

// Route::post('login', [UserController::class, 'login']);


// Private Routes
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::post('users', [UserController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});