import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row overflow-hidden font-sans text-gray-100">
            <Head title="Register" />
            
            {/* Image Side */}
            <div className="relative md:w-1/2 h-40 md:h-screen hidden xl:block border-r border-zinc-800">
                <img src="https://images.unsplash.com/photo-1593702283944-7f8e8749e3e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Barber Tools" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-zinc-950"></div>
                <div className="absolute top-1/2 right-12 -translate-y-1/2 max-w-sm text-right">
                    <h3 className="text-4xl font-black uppercase text-amber-500 mb-4">Join the Club</h3>
                    <p className="text-lg text-gray-300 font-light">Create an account to track your appointments, manage preferences, and earn exclusive loyalty point rewards.</p>
                </div>
                <div className="absolute top-8 left-8">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase text-white">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>
                </div>
            </div>

            {/* Form Side */}
            <div className="md:w-1/2 xl:w-1/2 lg:w-full flex items-center justify-center p-8 relative mx-auto">
                <div className="absolute top-8 left-8 sm:hidden">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-white">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>
                </div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                    <h2 className="text-4xl font-black uppercase mb-2">Create <span className="text-amber-500">Account</span></h2>
                    <p className="text-gray-400 mb-8">Begin your premium grooming journey.</p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">WhatsApp Number</label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                autoComplete="tel"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">Confirm</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                {errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>}
                            </div>
                        </div>

                        <button disabled={processing} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider transition-all disabled:opacity-50 mt-4">
                            Register Account
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-zinc-950 text-gray-500 font-medium">or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <a href={route('google.login')} className="w-full flex items-center justify-center px-4 py-3 border border-zinc-800 rounded-lg shadow-sm text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors">
                                <IconBrandGoogle className="h-5 w-5 mr-3 text-red-500" />
                                Google
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link href={route('login')} className="text-amber-500 hover:text-amber-400 font-bold transition-colors">
                            Log in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
