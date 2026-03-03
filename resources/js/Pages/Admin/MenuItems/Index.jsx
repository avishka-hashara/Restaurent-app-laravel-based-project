import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ auth, menuItems }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this menu item?')) {
            router.delete(`/admin/menu-items/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manage Menu Items</h2>}
        >
            <Head title="Menu Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex justify-end mb-4">
                        <Link
                            href="/admin/menu-items/create"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded transition"
                        >
                            + Add New Item
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        <th className="py-3 px-4 border-b dark:border-gray-600">Name</th>
                                        <th className="py-3 px-4 border-b dark:border-gray-600">Category</th>
                                        <th className="py-3 px-4 border-b dark:border-gray-600">Price</th>
                                        <th className="py-3 px-4 border-b dark:border-gray-600">Status</th>
                                        <th className="py-3 px-4 border-b dark:border-gray-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-6 text-center text-gray-500 dark:text-gray-400">
                                                No menu items found. Click "Add New Item" to create one.
                                            </td>
                                        </tr>
                                    ) : (
                                        menuItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium">{item.name}</td>
                                                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400">{item.category?.name || 'Uncategorized'}</td>
                                                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400">${item.price}</td>
                                                <td className="py-3 px-4 border-b dark:border-gray-700">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {item.is_available ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 border-b dark:border-gray-700 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-500 hover:text-red-700 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}