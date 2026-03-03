import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />
            <div className="max-w-2xl mx-auto px-4 py-16 w-full">
                <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">Contact Us</h1>

                <form onSubmit={submit} className="space-y-6 bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-xl">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                            placeholder="Your Name"
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                            placeholder="your@email.com"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Subject</label>
                        <input
                            type="text"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                            placeholder="Topic"
                        />
                        {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition min-h-[150px]"
                            placeholder="How can we help you?"
                        ></textarea>
                        {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {processing ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </PublicLayout>
    );
}
