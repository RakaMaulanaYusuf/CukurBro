<?php

namespace App\Http\Controllers;

use App\Models\Barber;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard(Request $request)
    {
        // Require customer role
        if ($request->user()->role !== 'customer') {
            return redirect()->route('admin.dashboard');
        }

        $bookings = $request->user()->bookings()->with(['barber'])->latest()->get();
        $services = Service::where('is_active', true)->get();
        $barbers = Barber::where('is_active', true)->get();

        return Inertia::render('Customer/Dashboard', [
            'bookings' => $bookings,
            'services' => $services,
            'barbers' => $barbers,
        ]);
    }
}
