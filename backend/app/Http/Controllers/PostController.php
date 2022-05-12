<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Library\ApiHelpers;
use App\Models\JobPost;
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
                $post->description = $request['description'];
                $post->location = $request['location'];
                $post->location_type = $request['location_type'];
                $post->seniority_level = $request['seniority_level'];
                $post->pay_range = $request['pay_range'];
                $post->job_type = $request['job_type'];
                $post->employment_type = $request['employment_type'];
                
                $post->save();
                
                if($request->has('skillsets')){
                    $skilljson = json_decode($request->getContent(), true);
                    foreach($skilljson['skillsets'] as $item)
                    {
                        $post->skillsets()->attach($item['id']);
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
                        $post->skillsets()->attach($item['id']);
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
            $post->delete(); // Delete the specific post data
            if (!empty($post)) {
                return response([
                    'post' => $post,
                    'message' => 'Deleted successfully',
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
