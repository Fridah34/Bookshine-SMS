<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable =[
        'user_id',
        'occupation',
        'address',
    ];

    //relationships
    public function user()
    {
        return $this->belongsTo(USer::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'parent_student', 'parent_id', 'student_id')
            ->withPivot('relationship', 'is_primary_contact')
            ->withTimestamps();
    }

    // Methods
    public function addChild($studentId, $relationship = 'guardian', $isPrimaryContact = false)
    {
        if (!$this->students()->where('student_id', $studentId)->exists()) {
            $this->students()->attach($studentId, [
                'relationship' => $relationship,
                'is_primary_contact' => $isPrimaryContact,
            ]);
        }
        return $this;
    }

    public function removeChild($studentId)
    {
        $this->students()->detach($studentId);
        return $this;
    }
}
