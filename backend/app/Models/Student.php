<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admission_number',
        'class_id',
        'date_of_birth',
        'gender',
        'address',
        'admission_date',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date'=>'date',
    ];

    //relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function parents()
    {
        return $this->belongsToMany(ParentModel::class, 'parent_student', 'student_id', 'parent_id')
           ->withPivot ('relationship', 'is_primary_contact')
           ->withTimestamps();
    }

    public function primaryParent()
    {
        return $this->belongsToMany(ParentModel::class, 'parent_student','student_id', 'parent_id')
          ->wherePivot('is_primary_contact', true)
          ->withPivot('relationship', 'is_primary_contact')
          ->first();
    }

    //Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInClass($query , $classId)
    {
        return $query->where('class_id', $classId);
    }

    public function assignToClass($classId)
    {
        $this->update(['class_id' => $classId]);
        return $this;
    }

    public function graduate()
    {
        $this->update(['status' => 'graduated']);
        return $this;
    }

    public function suspend()
    {
        $this->update(['status' => 'suspended']);
        return $this;
    }

    public function reactivate()
    {
        $this->update (['status' => 'active']);
        return $this;
    }


}
