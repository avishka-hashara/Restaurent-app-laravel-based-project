import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Welcome Banner */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome back, {auth.user.name}! Here is what is happening at Sizzle & Spice today.
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Menu Items Stat Card */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-indigo-500 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Total Menu Items</h3>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.total_menu_items}</p>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-indigo-500 hover:text-indigo-400 font-medium cursor-pointer">
                                    Manage Menu &rarr;
                                </span>
                            </div>
                        </div>

                        {/* Reservations Stat Card */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-orange-500 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Pending Reservations</h3>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.pending_reservations}</p>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-orange-500 hover:text-orange-400 font-medium cursor-pointer">
                                    View Reservations &rarr;
                                </span>
                            </div>
                        </div>

                        {/* Messages Stat Card */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Unread Messages</h3>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.unread_messages}</p>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-green-500 hover:text-green-400 font-medium cursor-pointer">
                                    View Inbox &rarr;
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}