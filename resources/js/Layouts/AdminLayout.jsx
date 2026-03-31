import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { 
    IconLayoutDashboard, 
    IconUsers, 
    IconScissors, 
    IconCalendarTime, 
    IconPhoto, 
    IconLogout, 
    IconMenu2, 
    IconX, 
    IconUserCog 
} from '@tabler/icons-react';

export default function AdminLayout({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                iconTheme: {
                    primary: '#f59e0b',
                    secondary: '#FFFAEE',
                },
            });
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: IconLayoutDashboard },
        { name: 'User Management', href: route('admin.users.index'), icon: IconUserCog },
        { name: 'Manage Barbers', href: route('admin.barbers.index'), icon: IconUsers },
        { name: 'Manage Services', href: route('admin.services.index'), icon: IconScissors },
        { name: 'Bookings', href: route('admin.bookings.index'), icon: IconCalendarTime },
        { name: 'Gallery', href: route('admin.gallery.index'), icon: IconPhoto },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans text-gray-900 dark:text-gray-100 selection:bg-amber-500/30">
            <Toaster position="top-right" />
            
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {!sidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(true)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside 
                className={`fixed lg:sticky top-0 h-screen w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${!sidebarOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800 shrink-0">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-gray-900 dark:text-white flex-1">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-amber-500">
                        <IconX size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Menu</div>
                    {navItems.map((item) => {
                        const active = route().current()?.startsWith(item.href.split('/').pop());
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
                                    active 
                                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <item.icon size={20} stroke={active ? 2.5 : 1.5} />
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-zinc-800 shrink-0">
                    <div className="flex items-center gap-3 px-2 py-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold font-serif shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-bold truncate">{user.name}</div>
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        </div>
                    </div>
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button"
                        className="w-full flex items-center gap-2 justify-center py-2 mt-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <IconLogout size={18} /> Logout
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-amber-500">
                            <IconMenu2 size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{header}</h1>
                    </div>
                    <div>
                        <Link href="/" className="text-sm font-bold bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-full transition-transform hover:scale-105 shadow-sm">
                            View Site
                        </Link>
                    </div>
                </header>

                <div className="p-6 md:p-8 flex-1">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
