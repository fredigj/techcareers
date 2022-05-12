<?php

namespace App\Http\Controllers;

use App\Http\Library\ApiHelpers;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Seeker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeekerController extends Controller
{
    use ApiHelpers;

    public function serveSeeker($id) {
        $seeker = Seeker::find($id)->get();
        $user = User::select('first_name', 'last_name', 'user_image')->where('id', $id)->get();
        $experience = Experience::where('user_id', $id)->get();
        $education = Education::where('user_id', $id)->get();
        if($seeker != null) {
            return response([
                'seeker' => $seeker,
                'user' => $user,
                'experience' => $experience,
                'education' => $education
            ], 200);
        }
        else {
            return response([
                'message' => 'User not found',
            ], 404);
        }

    }

    public function updateSeeker(Request $request)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $seeker = Seeker::find($user->id);
                $seeker->update($request->all());
                $seeker->save();

                return response([
                    'seeker' => $seeker,
                    'message' => 'Seeker updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Seeker update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function createEducation(Request $request) {
        $user = $request->user();
        if($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if($validator->passes()) {
                $education = new Education();
                $seeker = Seeker::find($user->id);
                
                $education->field_of_study = $request['field_of_study'];
                $education->institution = $request['institution'];
                $education->degree = $request['degree'];
                $education->grade = $request['grade'];
                $education->start_date = $request['start_date'];
                $education->end_date = $request['end_date'];

                $seeker->educations()->save($education);
                $education->save();
            
                return response([
                    'education' => $education,
                    'message' => 'Education created successfully'
                ], 200);
            }
            return response([
                'message' => 'Education creation failed',
            ], 400);
        }
        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function updateEducation(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $education = Education::find($id);
                
                if($education->user_id != $user->id){
                    return response([
                        'message' => 'Unauthorized access',
                    ], 401);
                }
                
                $education->update($request->all());
                $education->save();

                return response([
                    'education' => $education,
                    'message' => 'Education updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Education update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function deleteEducation(Request $request, $id) {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $education = Education::find($id);
                if($education != null){ 
                    if($education->user_id != $user->id){
                        return response([
                            'message' => 'Unauthorized access',
                        ], 401);
                    }
                    
                    $education->delete();
                    
                    return response([                    
                        'message' => 'Education deleted successfully',
                    ], 200);
                } else {
                    return response([                    
                        'message' => 'Education does not exist',
                    ], 200);
                }
            }

            return response([
                'message' => 'Education deletion failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function createExperience(Request $request) {
        $user = $request->user();
        if($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if($validator->passes()) {
                $experience = new Experience();
                $seeker = Seeker::find($user->id);
                
                $experience->company = $request['company'];
                $experience->title = $request['title'];
                $experience->location = $request['location'];
                $experience->description = $request['description'];
                $experience->employment_type = $request['employment_type'];
                $experience->is_current = $request['is_current'];
                $experience->start_date = $request['start_date'];
                $experience->end_date = $request['end_date'];

                $seeker->experiences()->save($experience);
                $experience->save();
            
                return response([
                    'experience' => $experience,
                    'message' => 'Experience created successfully'
                ], 200);
            }
            return response([
                'message' => 'Experience creation failed',
            ], 400);
        }
        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function updateExperience(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $experience = Experience::find($id);
                
                if($experience->user_id != $user->id){
                    return response([
                        'message' => 'Unauthorized access',
                    ], 401);
                }
                
                $experience->update($request->all());
                $experience->save();

                return response([
                    'education' => $experience,
                    'message' => 'Education updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Education update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function deleteExperience(Request $request, $id) {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $experience = Experience::find($id);
                if($experience != null){ 
                    if($experience->user_id != $user->id){
                        return response([
                            'message' => 'Unauthorized access',
                        ], 401);
                    }
                    
                    $experience->delete();
                    
                    return response([                    
                        'message' => 'Experience deleted successfully',
                    ], 200);
                } else {
                    return response([                    
                        'message' => 'Experience does not exist',
                    ], 200);
                }
            }

            return response([
                'message' => 'Experience deletion failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

}
