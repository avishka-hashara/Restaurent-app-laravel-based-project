import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500 selection:text-white">
            <nav className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-orange-500">
                    Sizzle & Spice
                </Link>
                <div className="space-x-6 text-sm font-medium text-neutral-300">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/menu" className="hover:text-white transition">Menu</Link>
                    <Link href="/reservations" className="hover:text-white transition">Reservations</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </div>
            </nav>

            <main className="min-h-[80vh] flex flex-col">
                {children}
            </main>

            <footer className="bg-neutral-950 border-t border-neutral-800 text-center py-8 text-sm text-neutral-500 mt-auto">
                <p>&copy; {new Date().getFullYear()} Sizzle & Spice. All rights reserved.</p>
            </footer>
        </div>
    );
}
