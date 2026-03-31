<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Link google_id if it's an existing manually registered user without one
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleUser->getId()]);
                }
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'role' => 'customer',
                    'points' => 0,
                    'phone' => '', // Needs to be updated later by user
                    'password' => Hash::make(Str::random(24)),
                ]);
            }

            Auth::login($user);

            // Redirect appropriately
            if ($user->role === 'admin') {
                return redirect()->intended(route('admin.dashboard', absolute: false));
            }

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['email' => 'Unable to login with Google right now. Please try again.']);
        }
    }
}
