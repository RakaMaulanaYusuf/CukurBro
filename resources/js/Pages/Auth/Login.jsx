import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row overflow-hidden font-sans text-gray-100">
            <Head title="Log in" />

            {/* Image Side */}
            <div className="relative md:w-1/2 h-64 md:h-screen hidden sm:block">
                {/* <img src="https://images.unsplash.com/photo-1599351431202-181a95e2c56f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Barbershop" className="w-full h-full object-cover" /> */}
                <img src="/images/bannerbarber.jpg" alt="Barbershop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-zinc-950"></div>
                <div className="absolute top-8 left-8">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase text-white">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>
                </div>
            </div>

            {/* Form Side */}
            <div className="md:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute top-8 left-8 sm:hidden">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase text-white">
                        Cukor<span className="text-amber-500">Bro</span>.
                    </Link>
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                    <h2 className="text-4xl font-black uppercase mb-2">Welcome <span className="text-amber-500">Back</span></h2>
                    <p className="text-gray-400 mb-8">Sign in to your account to manage your bookings and loyalty points.</p>

                    {status && <div className="mb-4 font-medium text-sm text-green-500">{status}</div>}

                    <form onSubmit={submit} className="space-y-5">
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
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="block text-sm font-bold text-gray-300">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-amber-500 hover:text-amber-400 font-medium transition-colors">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded bg-zinc-900 border-zinc-700 text-amber-500 shadow-sm focus:ring-amber-500"
                                />
                                <span className="ms-2 text-sm text-gray-400">Remember me</span>
                            </label>
                        </div>

                        <button disabled={processing} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider transition-all disabled:opacity-50">
                            Log in
                        </button>
                    </form>

                    <div className="mt-8">
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
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-amber-500 hover:text-amber-400 font-bold transition-colors">
                            Sign up here
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
