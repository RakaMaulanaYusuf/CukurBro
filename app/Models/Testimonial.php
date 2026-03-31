<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'customer_name', 'booking_id', 'rating', 'review', 'is_featured'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
