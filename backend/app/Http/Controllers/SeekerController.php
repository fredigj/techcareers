<?php

namespace App\Http\Controllers;

use App\Http\Library\ApiHelpers;
use App\Models\Award;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Seeker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeekerController extends Controller
{
    use ApiHelpers;

    public function serveSeeker($id) {
        $seeker = Seeker::find($id);
        if($seeker != null) {
            $user = User::select('first_name', 'last_name', 'user_image')->where('id', $id)->first();
            $experience = Experience::where('user_id', $id)->get();
            $education = Education::where('user_id', $id)->get();
            $award = Award::where('user_id', $id)->get();
            $project = Project::where('user_id', $id)->get();

            return response([
                'seeker' => $seeker,
                'user' => $user,
                'experience' => $experience,
                'education' => $education,
                'award' => $award,
                'project' => $project,
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
                if($education == null) {
                    return response([
                        'message' => 'Education does not exist',
                    ], 400);
                } else {
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

    public function createAward(Request $request) {
        $user = $request->user();
        if($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if($validator->passes()) {
                $award = new Award();
                $seeker = Seeker::find($user->id);
                
                $award->title = $request['title'];
                $award->institution = $request['institution'];            
                $award->description = $request['description'];
                $award->issue_date = $request['issue_date'];
                $award->expiry_date = $request['expiry_date'];

                $seeker->awards()->save($award);
                $award->save();
            
                return response([
                    'experience' => $award,
                    'message' => 'Award created successfully'
                ], 200);
            }
            return response([
                'message' => 'Award creation failed',
            ], 400);
        }
        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function updateAward(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $award = Award::find($id);
                
                if($award->user_id != $user->id){
                    return response([
                        'message' => 'Unauthorized access',
                    ], 401);
                }
                
                $award->update($request->all());
                $award->save();

                return response([
                    'education' => $award,
                    'message' => 'Award updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Award update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function deleteAward(Request $request, $id) {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $award = Award::find($id);
                if($award != null){ 
                    if($award->user_id != $user->id){
                        return response([
                            'message' => 'Unauthorized access',
                        ], 401);
                    }
                    
                    $award->delete();
                    
                    return response([                    
                        'message' => 'Award deleted successfully',
                    ], 200);
                } else {
                    return response([                    
                        'message' => 'Award does not exist',
                    ], 200);
                }
            }

            return response([
                'message' => 'Award deletion failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function createProject(Request $request) {
        $user = $request->user();
        if($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if($validator->passes()) {
                $project = new Project();
                $seeker = Seeker::find($user->id);
                
                $project->title = $request['title'];
                $project->url = $request['url'];            
                $project->description = $request['description'];
                
                $seeker->projects()->save($project);
                $project->save();
            
                return response([
                    'project' => $project,
                    'message' => 'Project created successfully'
                ], 200);
            }
            return response([
                'message' => 'Project creation failed',
            ], 400);
        }
        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function updateProject(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $project = Project::find($id);
                
                if($project->user_id != $user->id){
                    return response([
                        'message' => 'Unauthorized access',
                    ], 401);
                }
                
                $project->update($request->all());
                $project->save();

                return response([
                    'project' => $project,
                    'message' => 'Award updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Award update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function deleteProject(Request $request, $id) {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isSeeker($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $project = Project::find($id);
                if($project != null){ 
                    if($project->user_id != $user->id){
                        return response([
                            'message' => 'Unauthorized access',
                        ], 401);
                    }
                    
                    $project->delete();
                    
                    return response([                    
                        'message' => 'Award deleted successfully',
                    ], 200);
                } else {
                    return response([                    
                        'message' => 'Award does not exist',
                    ], 200);
                }
            }

            return response([
                'message' => 'Award deletion failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

}
