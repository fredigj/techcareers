<?php

namespace App\Http\Controllers;

use App\Http\Library\ApiHelpers;
use App\Models\Company;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    use ApiHelpers;

    public function createCompany(Request $request) {
        $user = $request->user();
        if($this->isAdmin($user) || $this->isRecruiter($user)) {
            $validator = Validator::make($request->all(), $this->postValidationRules());
            if($validator->passes()) {
                $company = new Company();
                $recruiter = Recruiter::find($user->id);
                $company->name = $request['name'];
                if($request->hasFile('company_image')) {
                    $file = $request->file('company_image');
                    $extension = $file->getClientOriginalExtension();
                    
                    $filename = time().'.'.$extension;
                    $file->move('uploads/company_images/', $filename);
                    $user->user_image = 'uploads/company_images/'.$filename;
                } else {                    
                    $company->company_image = $request['company_image'];
                }
                $company->short_description = $request['short_description'];
                $company->long_description = $request['long_description'];
                $company->email = $request['email'];
                $company->establishment_year = $request['establishment_year'];
                $company->website_url = $request['website_url'];
                $company->location = $request['location'];   
                
                $company->save();

                $recruiter->company()->associate($company);
                $recruiter->save();

                return response([
                    'recruiter' => $recruiter,
                    'message' => 'Company created successfully'
                ], 200);
            }
        }
    }
}