import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateReservation() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '', last_name: '', email: '', phone: '',
        reservation_date: '', reservation_time: '', party_size: 2, special_requests: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reservations');
    };

    return (
        <PublicLayout>
            <Head title="Book a Table" />
            <div className="max-w-2xl mx-auto px-4 py-16 w-full">
                <h1 className="text-4xl font-bold mb-8 text-center">Book a Table</h1>

                <form onSubmit={submit} className="space-y-6 bg-neutral-900 p-8 rounded-xl border border-neutral-800">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">First Name</label>
                            <input type="text" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition" />
                            {errors.first_name && <div className="text-red-500 text-xs mt-1">{errors.first_name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Last Name</label>
                            <input type="text" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Date</label>
                            <input type="date" value={data.reservation_date} onChange={e => setData('reservation_date', e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white color-scheme-dark" />
                            {errors.reservation_date && <div className="text-red-500 text-xs mt-1">{errors.reservation_date}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Time</label>
                            <input type="time" value={data.reservation_time} onChange={e => setData('reservation_time', e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white color-scheme-dark" />
                        </div>
                    </div>

                    <button type="submit" disabled={processing} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-md transition disabled:opacity-50">
                        {processing ? 'Submitting...' : 'Confirm Reservation'}
                    </button>
                </form>
            </div>
        </PublicLayout>
    );
}