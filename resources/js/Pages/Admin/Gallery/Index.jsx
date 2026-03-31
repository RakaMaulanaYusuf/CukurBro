import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IconTrash, IconUpload } from '@tabler/icons-react';

export default function Index({ auth, items }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        image: null,
        type: 'standard',
        description: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'), {
            onSuccess: () => reset()
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('admin.gallery.destroy', id));
        }
    };

    return (
        <AdminLayout user={auth.user} header="Manage Gallery">
            <Head title="Manage Gallery" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 p-6 sticky top-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upload New Image</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image File</label>
                                <input type="file" onChange={e => setData('image', e.target.files[0])} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-zinc-100 file:dark:bg-zinc-700 dark:file:text-white" />
                                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
                                    <option value="standard">Standard Style</option>
                                    <option value="before-after">Before-After Style</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="2" className="w-full rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"></textarea>
                            </div>

                            <button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50">
                                <IconUpload size={18} /> Upload Image
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {items.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-400 bg-white dark:bg-zinc-800 rounded-lg border dark:border-zinc-700">No images in gallery yet.</div>
                        ) : items.map((item) => (
                            <div key={item.id} className="relative group rounded-lg overflow-hidden border dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 aspect-square">
                                <img src={`/storage/${item.image_url}`} alt={item.description || 'Gallery image'} className="w-full h-full object-cover" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="text-white">
                                        <div className="text-xs font-semibold capitalize">{item.type.replace('-', ' ')}</div>
                                        {item.description && <div className="text-xs text-gray-300 line-clamp-1">{item.description}</div>}
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shrink-0">
                                        <IconTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
