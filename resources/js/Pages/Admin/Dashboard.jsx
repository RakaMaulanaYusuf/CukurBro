import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AdminLayout user={auth.user} header="Dashboard Overview">
            <Head title="Admin Dashboard" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border dark:border-zinc-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Bookings</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.total_bookings}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border dark:border-zinc-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">Rp {stats.revenue}</p>
                </div>
            </div>
        </AdminLayout>
    );
}
