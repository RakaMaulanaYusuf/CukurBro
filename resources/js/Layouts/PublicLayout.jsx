import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconMoon, IconSun, IconMenu2, IconX, IconUser, IconSettings, IconLogout } from '@tabler/icons-react';

export default function PublicLayout({ children, canLogin, auth }) {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    const navLinks = [
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Team', href: '/#team' },
        { name: 'Gallery', href: '/#gallery' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-6 text-sm font-medium">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} className="hover:text-amber-500 transition-colors">{link.name}</a>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-4 border-l border-gray-200 dark:border-zinc-800 pl-6">
                            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                {darkMode ? <IconSun size={20} className="text-amber-500" /> : <IconMoon size={20} />}
                            </button>
                            
                            {auth && auth.user ? (
                                auth.user.role === 'admin' ? (
                                    <Link href={route('admin.dashboard')} className="text-sm font-bold text-amber-500 hover:text-amber-600">
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-amber-500 transition-colors">
                                            <IconUser size={18} /> {auth.user.name}
                                        </button>
                                        <div className="absolute right-0 top-10 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 dark:border-zinc-800 overflow-hidden">
                                            <div className="p-2">
                                                <div className="px-3 py-2 text-xs text-gray-500 font-semibold border-b dark:border-zinc-800 mb-2">
                                                    {auth.user.points} Points
                                                </div>
                                                <Link href={route('dashboard')} className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md">
                                                    <IconUser size={16} className="mr-2 text-gray-400" /> Dashboard & Booking
                                                </Link>
                                                <Link href={route('profile.edit')} className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md">
                                                    <IconSettings size={16} className="mr-2 text-gray-400" /> Profile Settings
                                                </Link>
                                                <Link href={route('logout')} method="post" as="button" className="w-full text-left flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md mt-1">
                                                    <IconLogout size={16} className="mr-2 text-red-500" /> Log Out
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                canLogin && (
                                    <Link href={route('login')} className="text-sm font-bold hover:text-amber-500 transition-colors">Log In</Link>
                                )
                            )}
                            
                            <Link href={auth && auth.user ? route('dashboard') : route('login')} className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-md shadow-amber-500/20">
                                Book Now
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={toggleDarkMode} className="p-2">
                            {darkMode ? <IconSun size={20} className="text-amber-500" /> : <IconMoon size={20} />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 shadow-xl py-4 flex flex-col">
                        <div className="px-6 flex flex-col gap-4">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold py-2 border-b dark:border-zinc-800 hover:text-amber-500">{link.name}</a>
                            ))}
                        </div>
                        
                        <div className="px-6 mt-6 flex flex-col gap-3">
                            {auth && auth.user ? (
                                <>
                                    <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Signed in as {auth.user.name} ({auth.user.points} pts)</div>
                                    {auth.user.role === 'admin' ? (
                                        <Link href={route('admin.dashboard')} className="w-full text-center py-3 border-2 border-amber-500 text-amber-500 font-bold rounded-lg hover:bg-amber-500 hover:text-black transition-colors">Admin Panel</Link>
                                    ) : (
                                        <Link href={route('dashboard')} onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 border-2 border-amber-500 text-amber-500 font-bold rounded-lg hover:bg-amber-500 hover:text-black transition-colors">Dashboard & Booking</Link>
                                    )}
                                    <Link href={route('profile.edit')} onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 border-2 border-gray-200 dark:border-zinc-700 font-bold rounded-lg hover:border-amber-500 transition-colors mt-2">Profile Settings</Link>
                                    <Link href={route('logout')} method="post" as="button" className="w-full text-center py-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-lg mt-2">Log Out</Link>
                                </>
                            ) : (
                                canLogin && <Link href={route('login')} className="w-full text-center py-3 border-2 border-gray-200 dark:border-zinc-700 font-bold rounded-lg hover:border-amber-500 transition-colors">Log In / Register</Link>
                            )}
                            <Link href={auth && auth.user ? route('dashboard') : route('login')} onClick={() => setIsMenuOpen(false)} className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-lg text-center font-black uppercase tracking-wider mt-2 shadow-lg shadow-amber-500/20">Book Appointment</Link>
                        </div>
                    </div>
                )}
            </nav>

            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-900 py-16 px-6">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <h3 className="text-3xl font-black tracking-tighter uppercase mb-4">Cukor<span className="text-amber-500">Bro</span>.</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Elevating your style with premium grooming and cuts. Modern barbershop experience crafted for gentlemen.</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li><a href="/#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                            <li><a href="/#services" className="hover:text-amber-500 transition-colors">Services</a></li>
                            <li><a href="/#team" className="hover:text-amber-500 transition-colors">The Masters</a></li>
                            <li><a href="/#gallery" className="hover:text-amber-500 transition-colors">Gallery</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">Business Hours</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li><span className="text-gray-900 dark:text-gray-300">Mon - Fri:</span> 10:00 AM - 09:00 PM</li>
                            <li><span className="text-gray-900 dark:text-gray-300">Sat - Sun:</span> 09:00 AM - 10:00 PM</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li>123 Styling Avenue, CA 90210</li>
                            <li>hello@cukorbro.com</li>
                            <li>+62 812 3456 7890</li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto max-w-7xl mt-16 pt-8 border-t border-gray-200 dark:border-zinc-900 text-center text-sm font-bold text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>&copy; {new Date().getFullYear()} CukorBro Barbershop. All rights reserved.</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-amber-500">Instagram</a>
                        <a href="#" className="hover:text-amber-500">Facebook</a>
                        <a href="#" className="hover:text-amber-500">TikTok</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
