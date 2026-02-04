<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Get all Users with filters
     */
    public function index(Request $request)
    {
        $query = User::with('roles');

        //Filter by role
        if ($request->has('role')) {
            $query->withRole($request->role);
        }

        if ($request->has('is_active')) {
            $query->where('is_active',$request->boolean('is_active'));
        }

        //search
        if($request->has('search')) {
            $request = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name','like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users= $query->paginate($request->get('per_page' , 15));

        return response() ->json([
            'success' = true,
            'data' = $users
        ]);

    }

    /**
     * Deactivate a user
     */
    public function deactivate($id)
    {
        $user = User::findOrFail($id);

        //Prevent deactivating yourself
        if($user->id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot deactivate your own account'
            ], 403);   
        }

        $user->update(['is_active'=> false]);

        return response()->json([
            'success' =>true,
            'message'=> 'User deactivated successfully'
        ]);
    }

    /**
     * Activate a user
     */
    public function activate ($id)
    {
        $user = User::findOrFail($id);

        $user->update(['is_active' =>true]);

        return response()->json([
            'success' => true,
            'message' => 'User activated successfully'
        ]);
    }

    /**
     * Delete a user permanently 
     */

    public function destroy($id)
    {
        $user =User::findOrFail($id);

        //Prevent deleting yourself
        if($user->id === auth()->id()) {
            return response()-> json([
                'success'=> false,
                'message' => 'You cannot delete your own account'
            ] , 403);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'meesage' => 'User delete successfully'
        ]);
    }
}
