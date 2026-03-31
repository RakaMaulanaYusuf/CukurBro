import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { IconTrash, IconCheck, IconX } from '@tabler/icons-react';

export default function Index({ auth, bookings }) {
    const handleStatusChange = (id, newStatus) => {
        router.put(route('admin.bookings.update', id), { status: newStatus }, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            router.delete(route('admin.bookings.destroy', id), { preserveScroll: true });
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
            case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-gray-300';
        }
    };

    return (
        <AdminLayout user={auth.user} header="Manage Bookings">
            <Head title="Manage Bookings" />
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 overflow-hidden text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-700/50 border-b dark:border-zinc-700 font-medium text-gray-500 dark:text-gray-400">
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Services / Barber</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No bookings found.</td></tr>
                            ) : bookings.map((b) => (
                                <tr key={b.id} className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{b.customer_name}</div>
                                        <div className="text-xs text-gray-500">{b.customer_phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                        <div>{b.booking_date}</div>
                                        <div className="text-xs text-gray-500">{b.start_time.substring(0, 5)} - {b.end_time.substring(0, 5)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-800 dark:text-gray-200">{b.service_names}</div>
                                        <div className="text-xs text-gray-500">Barber: {b.barber ? b.barber.name : 'Anyone'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                        Rp {b.total_price.toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={b.status} 
                                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                            className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${getStatusStyle(b.status)}`}
                                        >
                                            <option value="pending" className="bg-white text-gray-900">Pending</option>
                                            <option value="confirmed" className="bg-white text-gray-900">Confirmed</option>
                                            <option value="completed" className="bg-white text-gray-900">Completed</option>
                                            <option value="cancelled" className="bg-white text-gray-900">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(b.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" title="Delete Booking">
                                            <IconTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
