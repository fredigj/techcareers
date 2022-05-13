<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\JobPost;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    //

    public function serveRecruiter($id) {
        $recruiter = Recruiter::find($id);
        if($recruiter!= null) {
            $user = User::select('first_name', 'last_name', 'email','phone_number','user_image')->where('id', $id)->first();
            $job_posts = JobPost::where('user_id', $id)->get();
            $company = Company::where('id', $recruiter->company_id)->first();

            return response([
                'recruiter' => $recruiter,
                'user' => $user,
                'company' => $company,
                'job_post' => $job_posts,                
            ], 200);
        }
        else {
            return response([
                'message' => 'User not found',
            ], 404);
        }

    }
}
