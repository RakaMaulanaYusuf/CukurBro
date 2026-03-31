import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 dark:text-gray-200 leading-tight uppercase tracking-wide">Profile Settings</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="p-8 sm:p-10 bg-white dark:bg-zinc-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-8 sm:p-10 bg-white dark:bg-zinc-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-8 sm:p-10 bg-white dark:bg-zinc-900 shadow-sm sm:rounded-2xl border border-red-100 dark:border-red-900/30">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
