<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::latest()->get();
        return Inertia::render('Admin/Gallery/Index', ['items' => $gallery]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|max:4096',
            'type' => 'required|string|in:standard,before-after',
            'description' => 'nullable|string'
        ]);

        $validated['image_url'] = $request->file('image')->store('gallery', 'public');

        Gallery::create($validated);
        return back()->with('success', 'Image uploaded.');
    }

    public function destroy(Gallery $gallery)
    {
        Storage::disk('public')->delete($gallery->image_url);
        $gallery->delete();
        return back()->with('success', 'Image deleted.');
    }
}
