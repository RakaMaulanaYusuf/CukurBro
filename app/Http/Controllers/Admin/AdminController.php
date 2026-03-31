<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;

class AdminController extends Controller
{
    public function index()
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'revenue' => Booking::sum('total_price'),
        ];
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
