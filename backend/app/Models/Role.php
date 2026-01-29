<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'level',
    ];

    protected $casts = [
        'level' => 'integer',
    ];

    //Relationships
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user')
           ->withPivot('assigned_by', 'assigned_at')
           ->withTimestamps();
    }

    public function permissions()
    {
        return $this->belongsToMany (Permission::class, 'permission_role');
    }

    //methods
    Public function givePermissionTo($permission)
    {
        if(is_string($permission)) {
            $permission = Permission::where('name', $permission)->firstOrFail();
        }

        if(!$this->permissions()->where('permission_id', $permission->id)->exists()) {
            $this->permissions()->attach($permission->id);
        }
        return $this;
    }

    public function revokePermissionTo($permission)
    {
        if(is_string($permission)) {
            $permission = Permission::where('name', $permission)->firstOrFail();
        }

        $this->permissions()->detach($permission->id);
        return $this;
    }

    public function hasPermission($permission)
    {
        if (is_string($permission)) {
            return $this->permissions()->where('name', $permission)->exists();
        }
        return $this->permissions()->where('permission_id', $permission->id)->exists();
    }

    public function syncPermissions($permissions)
    {
        $permissionIds = collect($permissions)->map(function ($permission) {
            if (is_string($permission)) {
                return Permission::where('name', $permission)->firstOrFail()->id;
            }
            return $permission;
        })->toArray();

        $this->permissions()->sync($permissionIds);
        return $this;
    }

    // Scopes
    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }
}
