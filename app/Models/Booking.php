<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_name', 'customer_email', 'customer_phone',
        'user_id', 'barber_id', 'service_ids', 'booking_date',
        'start_time', 'end_time', 'total_price', 'status'
    ];

    protected $casts = [
        'service_ids' => 'array',
        'booking_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }
}
