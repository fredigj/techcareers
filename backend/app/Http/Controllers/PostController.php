<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Library\ApiHelpers;
use App\Models\JobPost;
use App\Models\Skillset;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{    
    use ApiHelpers; // <---- Using the apiHelpers Trait

    public function createPost(Request $request)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isRecruiter($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {
                // Create New Post
                $post = new JobPost();
                $post->user_id = $user->id;        
                $post->headline = $request['headline'];
                $post->description = $request['description'];
                $post->location = $request['location'];
                $post->location_type = $request['location_type'];
                $post->seniority_level = $request['seniority_level'];
                $post->pay_range = $request['pay_range'];
                $post->employment_type = $request['employment_type'];
                
                $post->save();
                
                if($request->has('skillsets')){
                    $skilljson = json_decode($request->getContent(), true);
                    foreach($skilljson['skillsets'] as $item)
                    {
                        $skill = Skillset::where('skill_name', $item)->first();
                        if($skill == null) {
                            $skill = new Skillset();
                            $skill->skill_name = $item;
                            $skill->save();
                        }                         
                        $post->skillsets()->attach($skill['id']);                        
                    }
                }
                
                $post->recruiter()->associate($user);
                
                return response([
                    'post' => $post,
                    'message' => 'Created successfully',
                ], 200);
            }

            return response([
                'message' => 'Creation failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function updatePost(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isRecruiter($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if ($validator->passes()) {                
                $post = JobPost::find($id);
                if($request->has('skillsets')){
                    $skilljson = json_decode($request->getContent(), true);
                    foreach($skilljson['skillsets'] as $item)
                    {
                        $skill = Skillset::where('skill_name', $item)->first();
                        if($skill == null) {
                            $skill = new Skillset();
                            $skill->skill_name = $item;
                            $skill->save();
                        }                         
                        $post->skillsets()->attach($skill['id']);                        
                    }
                    $post->update($request->except('skillsets'));
                } else {
                    $post->update($request->all());
                }
                $post->save();

                return response([
                    'post' => $post,
                    'message' => 'Updated successfully',
                ], 200);
            }

            return response([
                'message' => 'Update failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }

    public function deletePost(Request $request, $id)
    {
        $user = $request->user();
        if ($this->isAdmin($user) || $this->isRecruiter($user)) {
            $post = JobPost::find($id); // Find the id of the post passed
            if ($post != null) {
                $post->delete(); // Delete the specific post data
                return response([
                    'post' => $post,
                    'message' => 'Deleted successfully',
                ], 200);
            } else {
                return response([
                    'post' => $post,
                    'message' => 'Job post not found',
                ], 200);
            }

            return response([
                'message' => 'Deletion failed',
            ], 400);
        }

        return response([
            'message' => 'Unauthorized access',
        ], 401);
    }    
}
