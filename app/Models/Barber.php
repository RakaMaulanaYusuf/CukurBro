<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barber extends Model
{
    protected $fillable = [
        'user_id', 'name', 'specialization', 'photo_url', 'is_active'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
