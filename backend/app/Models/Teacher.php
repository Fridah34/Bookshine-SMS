<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_number',
        'subject_specialization',
        'hire_date',
        'qualification',
        'status',
    ];

    protected $casts = [
        'hire_date' => 'date',
    ];

    //relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'class_teacher','teacher_id', 'class_id')
           ->withPivot('subject_id', 'academic_year_id')
           ->withTimestamps();
    }

    public function classTeacherOf()
    {
        return $this->hasMany(Classes::class, 'class_teacher_id');
           
    }

    //scopes
    public function scopeActive($query)
    {
        return $query->where('status','active');
    }

    public function scopeBySpecialization($query, $specialization)
    {
        return $query->where('subject_specialization', $specialization);
    }

    //methods
    public function assignToClass($classId, $subjectId = null, $academicYearId = null)
    {
        $this->classes()->attach($classId, [
            'subject_id' => $subjectId,
            'academic_year_id' => $academicYearId,
        ]);
        return $this;
    }

    public function removeFromClass($classId)
    {
        $this->classes()->detach($classId);
        return $this;
    }
}
