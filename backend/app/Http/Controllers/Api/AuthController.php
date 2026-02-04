<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\ParentModel;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','registerStudent', 'registerParent']]);
    }

    /**
     * Register a new user
     */
    public function registerStudent(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone'=> 'nullable|string|max:20',
            'date_of_birth'=> 'required|date',
            'gender'=> 'required|in:male,female,other',
            'address'=> 'nullable|string',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'=>$validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try{
            $user = User::create([
                'name' => $request->name,
                'email'=> $request->email,
                'password'=>Hash::make($request->password),
                'phone'=>$request ->phone,
                'is_active'=>true,
            ]);

            $studentRole = Role::where('name','student')->first();
            $user->assignRole($studentRole);

            //create student profile
            $admissionNumber = 'STU' . date('Y') .str_pad($user->id, 5, '0', STR_PAD_LEFT);
        

        $student = Student::create([
           'user_id' => $user->id,
           'admission_number' => $admissionNumber,
           'date_of_birth' => $request->date_of_birth,
           'gender' => $request->gender,
           'address' => $request->address,
           'admission_date' => now(),
           'status' => 'active',
        ]);

        $token =JWTAuth::fromUser($user);

        DB::commit();

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user' => $user->load('roles'),
            'student' => $student,
        ], 201);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json([
            'success' => false,
            'message'=> 'Registration failed: ' .$e->getMessage()
        ], 500);
      }
    }
    
    /**
     * Register a new parent (public registration)
     * Auto-approved - can login immediately
     */
    public function registerParent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Create user account - ACTIVE by default
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'is_active' => true, // ✅ IMMEDIATELY ACTIVE
            ]);

            // Assign parent role
            $parentRole = Role::where('name', 'parent')->first();
            $user->assignRole($parentRole);

            // Create parent profile
            $parent = ParentModel::create([
                'user_id' => $user->id,
                'occupation' => $request->occupation,
                'address' => $request->address,
            ]);

            // Generate JWT token for immediate login
            $token = JWTAuth::fromUser($user);

            DB::commit();

            // TODO: Send welcome email
            // Mail::to($user->email)->send(new WelcomeParentMail($user, $parent));

            return response()->json([
                'success' => true,
                'message' => 'Registration successful! You can now login to your account.',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60,
                'user' => $user->load('roles'),
                'parent' => $parent,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Login user and create token
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'=>$validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');


        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }

        $user = auth('api')->user();

        if(!$user->is_active) {
            auth('api')->logout();
            return response()->json([
                'success' => false,
                'message' => 'Your account has been deactivated. Please contact the administrator.',
            ], 403);
        }

        //Update last login
        $user->update(['last_login_at'=> now()]);


        return $this->respondWithToken($token);  
    }

    /**
     * Get the authenticated User
     */
    public function me()
        {

            $user = auth('api')->user()->load(['roles', 'student', 'teacher', 'parent']);

            return response()->json([
                'success'=>true,
                'user'=>$user,
                'profile'=> $this->getUserProfile($user)
            ]);
        }

    /**
     * Get user specific profile based on role
     */
    private function getUserProfile($user)
    {
        if($user->isStudent()){
            return $user->student->load(['class','parents']);
        }elseif($user->isTeacher()) {
            return $user->teacher->load(['classes','classesAsClassTeacher']);
        }elseif($user->isParent()){
            return $user->parent->load(['students.class']);
        }
        return null;
    }

    /**
     * Log the user out (Invalidate the token)
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token)

    {
        $user = auth('api')->user()->load('roles');

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user'=>$user,
            'roles'=> $user->roles->pluck('name'),
        ]);
    }
}
