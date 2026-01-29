<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'profile_photo',
        'is-active',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login-at'=> 'datetime',
            'password' => 'hashed',
            'is_active'=> 'boolean',
        ];
    }

    //JWT Methods
    public function getJWTIdentifier()

    {
        return $this ->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [ 
            'roles' => $this->roles->pluck('name'),
            'name' => $this->name,
            'email'=>$this->email,
        ];
    }

    //relationships
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user')
            ->withPivot ('assigned_by', "assigned_at")
            ->withTimestamps();
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

     public function parent()
    {
        return $this->hasOne(ParentModel::class);
    }

    //roles &permission methods
    public function hasRole($role)
    {
        if (is_array($role)) {
            return $this->roles()->whereIn('name', $role)->exists();
        }
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasAnyRole($roles)
    {
        return $this->roles()->whereIn('name', $roles)->exists();
    }

    public function hasPermission($permission)
    {
        return $this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('name', $permission);
        })->exists();
    }

    public function assignRole($role)
    {
        if (is_string($role)) {
            $role = Role::where('name', $role)->firstOrFail();
        }

        if (!$this->roles()->where('role_id', $role->id)->exists()) {
            $this->roles()->attach($role->id, [
                'assigned_by' => auth()->id(),
                'assigned_at' => now(),
            ]);
        }

        return $this;
    }

    public function removeRole($role)
    {
        if (is_string($role)) {
            $role = Role::where('name', $role)->firstOrFail();
        }

        $this->roles()->detach($role->id);
        return $this;
    }

    public function syncRoles($roles)
    {
        $roleIds = collect($roles)->map(function ($role) {
            if (is_string($role)) {
                return Role::where('name', $role)->firstOrFail()->id;
            }
            return $role;
        })->toArray();

        $this->roles()->sync($roleIds);
        return $this;
    }

    //Role checking methods
    public function isAdmin()
    {
        return $this->hasRole( 'admin');
    }

    public function isTeacher()
    {
        return $this->hasRole('teacher');
    }

    public function isStudent()
    {
        return $this->hasRole('student');
    }

    public function isParent()
    {
        return $this->hasRole ('parent');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeWithRole($query, $role)
    {
        return $query->whereHas('roles', function ($q) use ($role) {
            $q->where('name', $role);
        });
    }
}
