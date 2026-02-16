

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
                        <p>Email: <a href="mailto:asrehazir.web@gmail.com" className="text-red-600 hover:underline">asrehazir.web@gmail.com</a></p>
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
                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">Our Presence</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-sans">
                        You can find us across multiple platforms. For urgent news tips, please use our editorial email or phone number listed. Our desk is active 24/7 to bring you the latest verified reports.
                    </p>
                    <div className="space-y-4 font-sans">
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">WhatsApp Broadcast</h4>
                            <p className="text-sm font-bold">+91 40 1234 5678</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Office Hours</h4>
                            <p className="text-sm font-bold">Mon - Sat: 10:00 AM - 08:00 PM</p>
                        </div>
                    </div>
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

export function GuestColumnsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">Guest Columns</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                    Asre Hazir welcomes contributions from writers, scholars, and experts across various fields. Our Guest Columns provide a platform for diverse perspectives on contemporary issues.
                </p>
                <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-gray-900 dark:text-white">Submission Guidelines</h3>
                    <ul className="space-y-4 list-disc pl-5 font-sans text-sm">
                        <li>Original and unpublished content.</li>
                        <li>Articles should be between 800-1200 words.</li>
                        <li>Include a brief author bio and a high-resolution headshot.</li>
                        <li>Submissions should be sent in Word or Google Doc format.</li>
                    </ul>
                </div>
                <p>
                    Interested contributors can send their pitches to <a href="mailto:asrehazir.web@gmail.com" className="text-red-700 font-bold hover:underline">asrehazir.web@gmail.com</a>. Our editorial team will review your submission and get back to you.
                </p>
            </div>
        </div>
    );
}

export function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">Privacy Policy</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-sans">
                <p>At Asre Hazir, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">1. Information Collection</h3>
                <p>We may collect information you provide directly, such as when you subscribe to our newsletter or contact us. This may include your name, email address, and any messages you send.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">2. Use of Information</h3>
                <p>Your information is used to provide and improve our services, communicate with you, and personalize your experience on our website.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">3. Data Security</h3>
                <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">4. Cookies</h3>
                <p>We use cookies to enhance site navigation, analyze site usage, and assist in our marketing efforts.</p>
            </div>
        </div>
    );
}

export function TermsOfUsePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">Terms of Use</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-sans">
                <p>By accessing or using Asre Hazir, you agree to comply with and be bound by these Terms of Use.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">1. Accuracy of Content</h3>
                <p>While we strive for accuracy, we do not warrant that all content on the site is complete, current, or error-free.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">2. Intellectual Property</h3>
                <p>All content on Asre Hazir is protected by copyright and other intellectual property laws. You may not reproduce or distribute any content without prior written permission.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">3. User Conduct</h3>
                <p>Users are prohibited from using the site for any unlawful purpose or in any way that could damage or interfere with its operation.</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">4. Limitation of Liability</h3>
                <p>Asre Hazir will not be liable for any damages arising from the use of, or inability to use, our services.</p>
            </div>
        </div>
    );
}
