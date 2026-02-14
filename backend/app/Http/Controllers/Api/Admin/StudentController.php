<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Dispaly a listing of students
     */
    public function index(Request $request)
    {
        $query = Student::with(['user', 'class', 'parents']);

        //filters
        if($request->has('status')){
            $query->where('status', $request->status);
        }

        if($request->has('class_id')){
            $query->where('class_id', $request->class_id);
        }

        if($request->has('search')){
            $search = $request->search;
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email','like', "%{$search}%");
          })->orWhere('admission_number', 'like', "%{$search}%");
        }

        $students =$query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'message' => $students
        ]);
    }

    /**
     * Store a newly created student(admin creates)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string',
            'class_id' => 'nullable|exists:classes,id',
            'admission_date' => 'nullable|date',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' =>false,
                'errors' => $validator->errors()
            ],422);
        }

        DB::beginTransaction();
        try{
            //create user account
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            //Assign student role
            $studentRole = Role::where('name', 'student')->first();
            $user->assignRole($studentRole);

            //create student profile
            $admissionNumber = 'STU' .date('Y') . str_pad($user->id, 5, '0', STR_PAD_LEFT);

            $student = Student::create([
                'user_id' => $user->id,
                'admission_number' => $admissionNumber,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'address'=> $request->address,
                'class_id'=> $request->class_id,
                'admission_date' => $request->admission_date ?? now(),
                'status'=> 'active',

            ]);

            DB::commit();

            return response()-> json([
                'success'=> true,
                'message'=>'Student created successfully',
                'data'=> $student->load(['user', 'class'])
            ], 201);

        }catch(\Exception $e) {
            DB::rollback();
            return  response()->json([
                'success' =>false,
                'message' => 'Failed to create student: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified student
     */
    public function show($id)
    {
        $student = Student::with(['user', 'class', 'parents'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $student
        ]);
    }

    /**
     * Update the specified student
     */
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $student->user_id,
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'sometimes|required|date',
            'gender' => 'sometimes|required|in:male,female,other',
            'address' => 'nullable|string',
            'class_id' => 'nullable|exists:classes,id',
            'status' => 'sometimes|in:active,suspended,graduated,withdrawn',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Update user info
            $userData = $request->only(['name', 'email', 'phone']);
            if (!empty($userData)) {
                $student->user->update($userData);
            }

            // Update student info
            $studentData = $request->only(['date_of_birth', 'gender', 'address', 'class_id', 'status']);
            $student->update($studentData);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Student updated successfully',
                'data' => $student->load(['user', 'class'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update student: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified student
     */
    public function destroy($id)
    {
        $student = Student::findOrFail($id);

        DB::beginTransaction();
        try {
            $user = $student->user;
            $student->delete();
            $user->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Student deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete student: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve pending student registration
     */
    public function approve($id)
    {
        $student = Student::findOrFail($id);
        $user = $student->user;

        $user->update([
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Student approved successfully',
            'data' => $student->load('user')
        ]);
    }

    /**
     * Get pending registrations
     */
    public function pending()
    {
        $pendingStudents = Student::with('user')
            ->whereHas('user', function ($query) {
                $query->where('is_active', false);
            })->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $pendingStudents
        ]);
    }
}
