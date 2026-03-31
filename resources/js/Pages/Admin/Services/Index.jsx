import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

export default function Index({ auth, services }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout user={auth.user} header="Manage Services">
            <Head title="Manage Services" />
            <div className="flex justify-end mb-4">
                <Link href={route('admin.services.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm">
                    <IconPlus size={16} /> Add Service
                </Link>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-zinc-700/50 border-b dark:border-zinc-700 font-medium text-gray-500 dark:text-gray-400">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Price / Duration</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No services found.</td></tr>
                        ) : services.map((service) => (
                            <tr key={service.id} className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                                <td className="px-6 py-4 text-gray-900 dark:text-white flex items-center gap-3 font-medium">
                                    {service.image_url ? (
                                        <img src={`/storage/${service.image_url}`} alt={service.name} className="w-10 h-10 rounded object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded bg-gray-200 dark:bg-zinc-600 flex items-center justify-center text-xs text-gray-500">Img</div>
                                    )}
                                    {service.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    Rp {service.price.toLocaleString('id-ID')} / {service.duration} min
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${service.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {service.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={route('admin.services.edit', service.id)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                                            <IconEdit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                            <IconTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
