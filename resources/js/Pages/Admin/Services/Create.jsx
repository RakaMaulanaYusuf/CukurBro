import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        duration: 30,
        image: null,
        is_active: true
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.services.store'));
    };

    return (
        <AdminLayout user={auth.user} header="Add Service">
            <Head title="Add Service" />
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 max-w-2xl">
                <form onSubmit={submit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="3" className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"></textarea>
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (Rp)</label>
                            <input type="number" min="0" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
                            {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Minutes)</label>
                            <input type="number" min="5" value={data.duration} onChange={e => setData('duration', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
                            {errors.duration && <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                        <input type="file" onChange={e => setData('image', e.target.files[0])} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-zinc-100 file:dark:bg-zinc-700 dark:file:text-white" />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} id="is_active" className="rounded" />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Status</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t dark:border-zinc-700">
                        <Link href={route('admin.services.index')} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded">Cancel</Link>
                        <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50">Save</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
