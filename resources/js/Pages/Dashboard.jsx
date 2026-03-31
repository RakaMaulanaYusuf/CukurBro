import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { IconCalendarEvent, IconX, IconRefresh } from '@tabler/icons-react';

export default function Dashboard({ auth, bookings }) {

    const cancelBooking = (id) => {
        if(confirm('Are you sure you want to cancel this booking?')) {
            router.put(route('admin.bookings.update', id), { status: 'cancelled' }, { preserveScroll: true });
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">Pending</span>;
            case 'confirmed': return <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Confirmed</span>;
            case 'completed': return <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</span>;
            case 'cancelled': return <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelled</span>;
            default: return null;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Account</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Welcome Card & Points */}
                    <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg flex justify-between items-center p-6 border dark:border-zinc-700">
                        <div>
                            <div className="text-gray-900 dark:text-gray-100 text-xl font-bold mb-1">Welcome back, {auth.user.name}!</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">Manage your grooming schedules and preferences.</div>
                        </div>
                        <div className="text-center bg-amber-50 dark:bg-amber-900/10 px-6 py-4 rounded-xl border border-amber-200 dark:border-amber-500/30">
                            <div className="text-3xl font-black text-amber-500">{auth.user.points}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1">Loyalty Points</div>
                        </div>
                    </div>

                    {/* Bookings Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <IconCalendarEvent size={20} className="text-amber-500" /> My Bookings
                        </h3>
                        
                        <div className="bg-white dark:bg-zinc-800 shadow-sm sm:rounded-lg overflow-hidden border dark:border-zinc-700">
                            {bookings.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    You don't have any bookings yet. <br/>
                                    <Link href="/#booking" className="inline-block mt-4 text-amber-500 font-bold hover:underline">Book an Appointment</Link>
                                </div>
                            ) : (
                                <div className="divide-y dark:divide-zinc-700">
                                    {bookings.map(booking => (
                                        <div key={booking.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                                                        {booking.booking_date} <span className="text-gray-400 dark:text-zinc-500 mx-2">|</span> {booking.start_time.substring(0, 5)}
                                                    </div>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    <strong>Barber:</strong> {booking.barber ? booking.barber.name : 'Anyone'}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    <strong>Total:</strong> Rp {booking.total_price.toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                {(booking.status === 'pending' || booking.status === 'confirmed') && new Date(booking.booking_date) >= new Date() && (
                                                    <button 
                                                        onClick={() => cancelBooking(booking.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
                                                    >
                                                        <IconX size={16} /> Cancel
                                                    </button>
                                                )}
                                                {booking.status === 'completed' && (
                                                    <Link href="/#booking" className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-black bg-amber-500 hover:bg-amber-600 rounded transition-colors shadow-sm">
                                                        <IconRefresh size={16} /> Rebook
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
