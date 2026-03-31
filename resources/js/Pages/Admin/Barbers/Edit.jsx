import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, barber }) {
    const { data, setData, post, processing, errors } = useForm({
        name: barber.name || '',
        specialization: barber.specialization || '',
        photo: null,
        is_active: barber.is_active,
        _method: 'PUT' // For file uploads with method spoofing
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.barbers.update', barber.id));
    };

    return (
        <AdminLayout user={auth.user} header="Edit Barber">
            <Head title="Edit Barber" />
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 max-w-2xl">
                <form onSubmit={submit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization</label>
                        <input type="text" value={data.specialization} onChange={e => setData('specialization', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
                        {errors.specialization && <div className="text-red-500 text-sm mt-1">{errors.specialization}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo</label>
                        {barber.photo_url && (
                            <img src={`/storage/${barber.photo_url}`} alt="Current photo" className="h-16 w-16 rounded-full object-cover mb-2" />
                        )}
                        <input type="file" onChange={e => setData('photo', e.target.files[0])} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-zinc-100 file:dark:bg-zinc-700 dark:file:text-white" />
                        {errors.photo && <div className="text-red-500 text-sm mt-1">{errors.photo}</div>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} id="is_active" className="rounded" />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Status</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t dark:border-zinc-700">
                        <Link href={route('admin.barbers.index')} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded">Cancel</Link>
                        <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50">Save Changes</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
