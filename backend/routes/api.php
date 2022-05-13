<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DeleteProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileUpdateController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\SeekerController;
use App\Http\Controllers\SocialController;

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
    // User Routes
    Route::put('/update-profile', [ProfileUpdateController::class, 'updateProfile']);
    Route::post('/change-password', [ProfileUpdateController::class, 'changePassword']);
    Route::post('/delete-profile', [DeleteProfileController::class, 'deleteProfile']);
    Route::post('/users', [UserController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Post Routes
    Route::post('/create-post', [PostController::class, 'createPost']);
    Route::put('/update-post/{id}', [PostController::class, 'updatePost']);
    Route::delete('/delete-post/{id}', [PostController::class, 'deletePost']);
    
    // Company Routes
    Route::post('create-company', [CompanyController::class, 'createCompany']);
    Route::put('update-company/{id}', [CompanyController::class, 'updateCompany']);
    
    // Education Route
    Route::post('create-education', [SeekerController::class, 'createEducation']);
    Route::put('update-education/{id}', [SeekerController::class, 'updateEducation']);
    Route::delete('delete-education/{id}', [SeekerController::class, 'deleteEducation']);

    // Experience Route
    Route::post('create-experience', [SeekerController::class, 'createExperience']);
    Route::put('update-experience/{id}', [SeekerController::class, 'updateExperience']);
    Route::delete('delete-experience/{id}', [SeekerController::class, 'deleteExperience']);
    
    // Award Route
    Route::post('create-award', [SeekerController::class, 'createAward']);
    Route::put('update-award/{id}', [SeekerController::class, 'updateAward']);
    Route::delete('delete-award/{id}', [SeekerController::class, 'deleteAward']);

    // Project Route
    Route::post('create-project', [SeekerController::class, 'createProject']);
    Route::put('update-project/{id}', [SeekerController::class, 'updateProject']);
    Route::delete('delete-project/{id}', [SeekerController::class, 'deleteProject']);

    // Seeker Route
    Route::put('update-seeker', [SeekerController::class, 'updateSeeker']);    

    // Recruiter Route

});

Route::get('profile/{id}', [SeekerController::class, 'serveSeeker']);
Route::get('recruiter/{id}', [RecruiterController::class, 'serveRecruiter']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
