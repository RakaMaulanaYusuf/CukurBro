import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { IconMoon, IconSun, IconMenu2, IconX, IconUser, IconLogout, IconSettings } from '@tabler/icons-react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans transition-colors duration-300">
            <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">
                                    Cukor<span className="text-amber-500">Bro</span>.
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Link
                                    href={route('dashboard')}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${
                                        route().current('dashboard')
                                            ? 'border-amber-500 text-gray-900 dark:text-white'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-zinc-700'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <button onClick={toggleDarkMode} className="p-2 mr-4 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                {darkMode ? <IconSun size={20} className="text-amber-500" /> : <IconMoon size={20} />}
                            </button>

                            <div className="ms-3 relative group">
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-bold rounded-md text-black dark:text-black bg-amber-500 hover:bg-amber-600 focus:outline-none transition ease-in-out duration-150">
                                    <IconUser size={16} className="mr-2"/> {user.name}
                                </button>
                                
                                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 dark:border-zinc-700 overflow-hidden">
                                    <div className="py-1">
                                        <Link href={route('profile.edit')} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700">
                                            <IconSettings size={16} className="mr-2 text-gray-400" /> Profile
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <IconLogout size={16} className="mr-2 text-red-500" /> Log Out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                {darkMode ? <IconSun size={20} className="text-amber-500" /> : <IconMoon size={20} />}
                            </button>
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? <IconX size={24} /> : <IconMenu2 size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href={route('dashboard')} className={`block ps-3 pe-4 py-2 border-l-4 text-base font-medium ${route().current('dashboard') ? 'border-amber-500 text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-gray-300'}`}>
                            Dashboard
                        </Link>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-zinc-700">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link href={route('profile.edit')} className="block ps-3 pe-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                Profile
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="w-full text-left block ps-3 pe-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-zinc-900 shadow border-b border-gray-200 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
