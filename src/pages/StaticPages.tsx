
export function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-12 text-gray-700 dark:text-gray-300">
                <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                        Have a story to share or a query? Reach out to our editorial desk. We value our readers' feedback and contributions.
                    </p>

                    <div>
                        <h3 className="font-bold uppercase tracking-widest text-sm text-red-700 mb-2 font-sans">Editorial Desk</h3>
                        <p>Email: editor@asrehazir.com</p>
                        <p>Phone: +91 40 1234 5678</p>
                    </div>

                    <div>
                        <h3 className="font-bold uppercase tracking-widest text-sm text-red-700 mb-2 font-sans">Main Office</h3>
                        <p>Asre Hazir Media Groups</p>
                        <p>Banjara Hills, Road No. 12</p>
                        <p>Hyderabad, Telangana - 500034</p>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">Send a Message</h3>
                    <form className="space-y-4 font-sans">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Name</label>
                            <input type="text" className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Email</label>
                            <input type="email" className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Message</label>
                            <textarea rows={4} className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20"></textarea>
                        </div>
                        <button className="w-full bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-[0.2em] text-xs hover:bg-black transition-colors shadow-lg">Send Dispatch</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 inline-block mx-auto text-gray-900 dark:text-white uppercase tracking-tight">About Asre Hazir</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                <p className="italic font-bold text-2xl text-red-700">"The Voice Of Modern Journalism"</p>

                <p>
                    Established with a vision to provide authentic and unbiased news, Asre Hazir has grown into a leading digital news portal. We focus on delivering real-time updates while maintaining the highest editorial standards.
                </p>

                <p>
                    From the streets of Hyderabad to the corridors of world power, our network of reporters works tirelessly to bring you stories that matter. We believe in journalism that informs, inspires, and empowers the community.
                </p>

                <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">Authentic</h4>
                        <p className="text-sm">Verified news from trusted sources.</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">Global</h4>
                        <p className="text-sm">World news through an Indian lens.</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">Fearless</h4>
                        <p className="text-sm">Unbiased reporting without compromise.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdvertisementsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 inline-block mx-auto text-gray-900 dark:text-white uppercase tracking-tight">Advertise With Us</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                    Reach a diverse and engaged audience through our premium advertising solutions. Asre Hazir offers multiple platforms for brands to connect with readers.
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-8 text-left">
                    <div className="p-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-red-700 transition-colors">
                        <h3 className="text-xl font-bold mb-4 uppercase text-gray-900 dark:text-white underline decoration-red-700 decoration-2">Digital Display</h3>
                        <ul className="space-y-2 text-sm font-sans">
                            <li>• Homepage Banner (970x90)</li>
                            <li>• Sidebar In-Article (300x250)</li>
                            <li>• Mobile Sticky Footer</li>
                        </ul>
                    </div>
                    <div className="p-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-red-700 transition-colors">
                        <h3 className="text-xl font-bold mb-4 uppercase text-gray-900 dark:text-white underline decoration-red-700 decoration-2">Sponsored Content</h3>
                        <ul className="space-y-2 text-sm font-sans">
                            <li>• Branded Articles</li>
                            <li>• Press Release Distribution</li>
                            <li>• Event Coverage</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-black dark:bg-red-700 text-white p-10 rounded-3xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Ready to Scale?</h2>
                    <p className="mb-6 font-sans text-sm tracking-widest uppercase opacity-80">Download our Media Kit or contact our sales team</p>
                    <a href="mailto:asrehazir.web@gmail.com" className="inline-block bg-white text-black font-black px-10 py-4 rounded-full uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">Contact Sales Team</a>
                </div>
            </div>
        </div>
    );
}
