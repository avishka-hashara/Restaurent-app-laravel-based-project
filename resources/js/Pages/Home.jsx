import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { flash } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Success Toast */}
            {flash.success && (
                <div className="bg-green-600/20 text-green-400 p-4 text-center border-b border-green-500/30">
                    {flash.success}
                </div>
            )}

            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"></div>
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Experience <span className="text-orange-500">Culinary</span> Excellence.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
                        A modern approach to classic flavors. Reserve your table today for an unforgettable evening.
                    </p>
                    <div className="space-x-4">
                        <Link href="/menu" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-md font-semibold transition shadow-lg shadow-orange-600/20">
                            Explore Menu
                        </Link>
                        <Link href="/reservations" className="bg-transparent border border-white hover:bg-white hover:text-neutral-900 px-8 py-3 rounded-md font-semibold transition">
                            Book a Table
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}