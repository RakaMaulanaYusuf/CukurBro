<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Barber;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BarberController extends Controller
{
    public function index()
    {
        $barbers = Barber::latest()->get();
        return Inertia::render('Admin/Barbers/Index', ['barbers' => $barbers]);
    }

    public function create()
    {
        return Inertia::render('Admin/Barbers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo_url'] = $request->file('photo')->store('barbers', 'public');
        }

        Barber::create($validated);
        return redirect()->route('admin.barbers.index')->with('success', 'Barber created.');
    }

    public function edit(Barber $barber)
    {
        return Inertia::render('Admin/Barbers/Edit', ['barber' => $barber]);
    }

    public function update(Request $request, Barber $barber)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('photo')) {
            if ($barber->photo_url) {
                Storage::disk('public')->delete($barber->photo_url);
            }
            $validated['photo_url'] = $request->file('photo')->store('barbers', 'public');
        }

        $barber->update($validated);
        return redirect()->route('admin.barbers.index')->with('success', 'Barber updated.');
    }

    public function destroy(Barber $barber)
    {
        if ($barber->photo_url) {
            Storage::disk('public')->delete($barber->photo_url);
        }
        $barber->delete();
        return redirect()->route('admin.barbers.index')->with('success', 'Barber deleted.');
    }
}
