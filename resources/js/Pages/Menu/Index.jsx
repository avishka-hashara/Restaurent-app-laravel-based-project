import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function MenuIndex({ categories }) {
    return (
        <PublicLayout>
            <Head title="Our Menu" />
            <div className="max-w-5xl mx-auto px-4 py-16 w-full">
                <h1 className="text-4xl font-bold mb-12 text-center text-orange-500">Our Menu</h1>

                {categories.map((category) => (
                    <div key={category.id} className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2 capitalize">
                            {category.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {category.menu_items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 group">
                                    <div className="w-full sm:w-24 h-24 bg-neutral-800 rounded-md flex-shrink-0 overflow-hidden">
                                        {/* Placeholder for item image */}
                                        <div className="w-full h-full bg-neutral-800 group-hover:bg-neutral-700 transition"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <span className="text-orange-400 font-bold">${item.price}</span>
                                        </div>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PublicLayout>
    );
}