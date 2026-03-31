import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import BookingForm from '@/Components/BookingForm';
import { IconShieldCheck, IconX, IconRefresh, IconCalendarEvent, IconStarFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, bookings, services, barbers }) {
    
    // Split bookings into upcoming and past
    const now = new Date();
    const upcomingBookings = bookings.filter(b => new Date(b.booking_date) >= now && b.status !== 'cancelled' && b.status !== 'completed');
    const pastBookings = bookings.filter(b => new Date(b.booking_date) < now || b.status === 'cancelled' || b.status === 'completed');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-gray-800 dark:text-gray-200 leading-tight uppercase tracking-widest">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 relative z-10">
                {/* Decorative Blobs for Customer Dashboard */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-zinc-800/10 dark:bg-zinc-800/50 rounded-full blur-[80px]"></div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
                    
                    {/* Welcome Banner */}
                    <div className="bg-zinc-950 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between border border-zinc-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
                        <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
                            <h3 className="text-amber-500 font-bold tracking-widest uppercase mb-2">Welcome Back</h3>
                            <h1 className="text-4xl md:text-5xl font-black text-white">{auth.user.name}</h1>
                        </div>
                        <div className="relative z-10 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-700/50 p-6 rounded-2xl md:w-48 text-center shrink-0">
                            <IconStarFilled className="text-amber-500 mb-2" size={32} />
                            <div className="text-4xl font-black text-white leading-none">{auth.user.points}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Loyalty Points</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* LEFT COLUMN: Booking Area */}
                        <div className="lg:col-span-7 space-y-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <h2 className="text-2xl font-black uppercase mb-6 tracking-tight dark:text-white">Make a <span className="text-amber-500">Booking</span></h2>
                                <BookingForm services={services} barbers={barbers} />
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: History */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                                
                                <h2 className="text-2xl font-black uppercase mb-6 tracking-tight dark:text-white">Upcoming <span className="text-amber-500">Appointments</span></h2>
                                
                                {upcomingBookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingBookings.map(booking => (
                                            <div key={booking.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-amber-500 transition-colors group">
                                                <div className="flex gap-4 items-center">
                                                    <div className="bg-amber-50 dark:bg-amber-900/10 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-amber-600 dark:text-amber-500 shrink-0 border border-amber-200 dark:border-amber-800/30">
                                                        <span className="text-xs font-bold uppercase">{new Date(booking.booking_date).toLocaleString('en-US', { month: 'short' })}</span>
                                                        <span className="text-2xl font-black leading-none">{new Date(booking.booking_date).getDate()}</span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-lg font-bold dark:text-white">{booking.start_time.substring(0, 5)}</h4>
                                                            {booking.status === 'confirmed' && <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1"><IconShieldCheck size={12}/> Confirmed</span>}
                                                            {booking.status === 'pending' && <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2.5 py-1 text-[10px] font-bold uppercase rounded">Pending</span>}
                                                        </div>
                                                        <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{booking.service_names}</div>
                                                        <div className="font-bold text-gray-900 dark:text-gray-300 text-sm">with {booking.barber?.name || 'Barber'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-zinc-800 pt-4 sm:pt-0 pl-0 sm:pl-4">
                                                    <div className="font-black text-lg dark:text-white mb-2 ml-auto sm:ml-0">Rp {booking.total_price.toLocaleString('id-ID')}</div>
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Are you sure you want to cancel this booking?')) {
                                                                router.put(route('admin.bookings.update', booking.id), { status: 'cancelled' }, { preserveScroll: true });
                                                            }
                                                        }}
                                                        className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded flex items-center gap-1 transition-colors"
                                                    >
                                                        <IconX size={14} /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-zinc-800 text-center text-gray-500 dark:text-gray-400">
                                        <IconCalendarEvent size={40} className="mx-auto mb-3 opacity-30" />
                                        <p>You have no upcoming appointments.</p>
                                    </div>
                                )}

                                {pastBookings.length > 0 && (
                                    <>
                                        <h2 className="text-2xl font-black uppercase mt-12 mb-6 tracking-tight dark:text-white">Past <span className="text-gray-500">History</span></h2>
                                        <div className="space-y-3">
                                            {pastBookings.slice(0, 5).map(booking => (
                                                <div key={booking.id} className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-bold dark:text-white">{new Date(booking.booking_date).toLocaleDateString()}</span>
                                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${booking.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                                {booking.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-500">{booking.service_names}</div>
                                                    </div>
                                                    <div className="font-bold text-sm dark:text-gray-300">
                                                        Rp {booking.total_price.toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                            ))}
                                            {pastBookings.length > 5 && (
                                                <div className="text-center mt-4">
                                                    <button className="text-amber-500 hover:text-amber-600 font-bold text-sm">View All History</button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
