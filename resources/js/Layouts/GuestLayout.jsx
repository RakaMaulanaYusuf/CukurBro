import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-zinc-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100">
            <div>
                <Link href="/" className="text-4xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">
                    Cukor<span className="text-amber-500">Bro</span>.
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-10 px-8 py-10 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden sm:rounded-2xl border border-gray-100 dark:border-zinc-800 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                {children}
            </div>
        </div>
    );
}
