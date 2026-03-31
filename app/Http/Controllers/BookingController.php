<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barber_id' => 'required|exists:barbers,id',
            'service_ids' => 'required|array|min:1',
            'service_ids.*' => 'exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
        ]);

        $services = Service::whereIn('id', $validated['service_ids'])->get();
        $totalDuration = $services->sum('duration');
        $totalPrice = $services->sum('price');
        $serviceNames = $services->pluck('name')->implode(', ');

        $startTime = Carbon::parse($validated['date'] . ' ' . $validated['time']);
        $endTime = $startTime->copy()->addMinutes($totalDuration);

        // Check Hard Collision before saving
        $overlapping = Booking::where('barber_id', $validated['barber_id'])
            ->whereDate('booking_date', $validated['date'])
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($query) use ($startTime, $endTime) {
                $query->where(function ($q) use ($startTime, $endTime) {
                    $q->whereTime('start_time', '<', $endTime->format('H:i:s'))
                      ->whereTime('end_time', '>', $startTime->format('H:i:s'));
                });
            })->exists();

        if ($overlapping) {
            return back()->with('error', 'The selected time slot is no longer available. Please select another time.');
        }

        $user = auth()->user();

        Booking::create([
            'user_id' => $user->id,
            'barber_id' => $validated['barber_id'],
            'customer_name' => $user->name,
            'customer_email' => $user->email,
            'customer_phone' => $user->phone ?? 'N/A',
            'service_ids' => $validated['service_ids'],
            'service_names' => $serviceNames,
            'total_price' => $totalPrice,
            'total_duration' => $totalDuration,
            'booking_date' => $validated['date'],
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
            'status' => 'pending',
        ]);

        return back()->with('success', 'Your booking request has been submitted successfully!');
    }

    public function availableSlots(Request $request)
    {
        $date = $request->date;
        $barberId = $request->barber_id;
        $duration = (int) $request->duration; // in minutes

        if (!$date || !$barberId || !$duration) {
            return response()->json([]);
        }

        $slots = [];
        $start = Carbon::parse('09:00');
        $end = Carbon::parse('20:00'); // Last booking around 8 PM

        while ($start < $end) {
            $slots[] = $start->format('H:i');
            $start->addMinutes(30);
        }

        // Get active bookings
        $bookings = Booking::where('barber_id', $barberId)
            ->whereDate('booking_date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();

        $availableSlots = [];

        foreach ($slots as $slot) {
            $slotTime = Carbon::parse($date . ' ' . $slot);
            $slotEndTime = $slotTime->copy()->addMinutes($duration);

            $isOverlapping = $bookings->contains(function ($booking) use ($slotTime, $slotEndTime, $date) {
                $bookingStart = Carbon::parse($date . ' ' . $booking->start_time);
                $bookingEnd = Carbon::parse($date . ' ' . $booking->end_time);

                return ($slotTime < $bookingEnd && $slotEndTime > $bookingStart);
            });

            // Don't show past times if date is today
            $isPast = $date == date('Y-m-d') && $slotTime < now();
            // Don't show if it goes past closing time (21:00)
            $isPastClosing = $slotEndTime > Carbon::parse($date . ' 21:00');

            if (!$isOverlapping && !$isPast && !$isPastClosing) {
                $availableSlots[] = $slot;
            }
        }

        return response()->json($availableSlots);
    }
}
