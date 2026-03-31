<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Barber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['user', 'barber'])->latest()->get();
        $services = Service::all()->keyBy('id');
        
        $bookings->transform(function ($booking) use ($services) {
            $bookingServices = collect($booking->service_ids)->map(function ($id) use ($services) {
                return $services->get($id) ? $services->get($id)->name : 'Unknown Service';
            });
            $booking->service_names = $bookingServices->implode(', ');
            return $booking;
        });

        return Inertia::render('Admin/Bookings/Index', ['bookings' => $bookings]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed'
        ]);

        $booking->update($validated);
        return redirect()->route('admin.bookings.index')->with('success', 'Booking status updated.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('admin.bookings.index')->with('success', 'Booking deleted.');
    }
}
