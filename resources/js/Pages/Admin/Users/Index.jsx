import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IconTrash, IconEdit, IconPlus, IconX, IconShield, IconUser } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ auth, users }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        email: '',
        role: 'customer',
        phone: '',
        points: 0,
        password: '',
        password_confirmation: '',
    });

    const openCreate = () => {
        clearErrors();
        reset();
        setEditingId(null);
        setIsModalOpen(true);
    };

    const openEdit = (user) => {
        clearErrors();
        setData({
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || '',
            points: user.points,
            password: '',
            password_confirmation: '',
        });
        setEditingId(user.id);
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('admin.users.update', editingId), {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout user={auth.user} header="User Management">
            <Head title="User Management" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Manage customers and administrator accounts.</p>
                <button onClick={openCreate} className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 flex items-center gap-2 rounded-xl font-bold transition-all shadow-md shadow-amber-500/20">
                    <IconPlus size={20} /> Add User
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 font-bold uppercase tracking-wider text-xs text-gray-400 dark:text-gray-500">
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Points</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-gray-50 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex justify-center items-center text-amber-500">
                                                {u.role === 'admin' ? <IconShield size={16} /> : <IconUser size={16} />}
                                            </div>
                                            {u.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 dark:text-gray-300">{u.email}</div>
                                        <div className="text-xs text-gray-500">{u.phone || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-amber-500 text-base">{u.points}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50' : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400'}`}>
                                            {u.role}
                                        </span>
                                        {u.google_id && <span className="ml-2 text-[10px] text-gray-400 border border-gray-200 dark:border-zinc-700 px-1.5 py-0.5 rounded uppercase">Google</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openEdit(u)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                <IconEdit size={18} />
                                            </button>
                                            {u.id !== auth.user.id && (
                                                <button onClick={() => handleDelete(u.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <IconTrash size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.95, opacity: 0 }} 
                            className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-zinc-800"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold dark:text-white">{editingId ? 'Edit User' : 'Add New User'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><IconX size={24} /></button>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                        <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500">
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Points</label>
                                        <input type="number" min="0" value={data.points} onChange={e => setData('points', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                        <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                    <p className="text-xs text-amber-500 font-bold mb-3">{editingId ? 'Leave blank to keep current password.' : 'Set initial password for user.'}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Confirm</label>
                                            <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 dark:text-white py-2 focus:ring-amber-500 focus:border-amber-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Cancel</button>
                                    <button type="submit" disabled={processing} className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50 transition-colors shadow-lg shadow-amber-500/20">
                                        {editingId ? 'Save Changes' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
