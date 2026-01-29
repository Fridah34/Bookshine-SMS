<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classes extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level',
        'section',
        'academic_year',
        'class_teacher_id',
        'capacity',
    ];

    protected $casts = [
        'level' => 'integer',
        'capacity' => 'integer',
    ];

    // Relationships
    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    public function classTeacher()
    {
        return $this->belongsTo(Teacher::class, 'class_teacher_id');
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'class_teacher')
            ->withPivot('subject_id', 'academic_year_id')
            ->withTimestamps();
    }

    // Scopes
    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    public function scopeCurrentYear($query)
    {
        return $query->where('academic_year', now()->year);
    }

    // Methods
    public function assignClassTeacher($teacherId)
    {
        $this->update(['class_teacher_id' => $teacherId]);
        return $this;
    }

    public function getStudentCount()
    {
        return $this->students()->count();
    }

    public function hasCapacity()
    {
        return $this->getStudentCount() < $this->capacity;
    }
}
