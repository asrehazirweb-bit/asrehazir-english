import { Mail, Phone, MapPin, Clock, Shield, Scale, Info, Megaphone, PenTool, Globe, Zap, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-zinc-900 border-b border-white/5">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] -mr-32 -mt-32"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Zap size={14} className="animate-pulse" /> Get In Touch
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Global <span className="text-primary italic">News Desk</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Have a breaking story, feedback, or a partnership inquiry? Our international newsroom is active 24/7 to listen and respond.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:border-primary transition-all duration-500">
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-xl font-serif font-black text-zinc-900 uppercase mb-2">Email Desk</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">For official inquiries and press releases</p>
                        <a href="mailto:asrehazir.web@gmail.com" className="text-lg font-bold text-primary hover:black transition-colors">asrehazir.web@gmail.com</a>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:border-primary transition-all duration-500">
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-xl font-serif font-black text-zinc-900 uppercase mb-2">Hotline</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">Report breaking news or news tips</p>
                        <span className="text-lg font-bold text-zinc-900">+91 40 1234 5678</span>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:border-primary transition-all duration-500">
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-xl font-serif font-black text-zinc-900 uppercase mb-2">Location</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">Banjara Hills, Road No. 12</p>
                        <span className="text-lg font-bold text-zinc-900">Hyderabad, India</span>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-serif font-black text-zinc-900 uppercase tracking-tighter mb-4 leading-tight">
                                Our Presence in the <br /><span className="text-primary italic">Global Market</span>
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                Asre Hazir is not just a portal; it's a movement in modern journalism. We bridge the gap between local events and global perspectives.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: <Clock className="text-primary" />, title: "24/7 Operations", desc: "Our newsroom never sleeps." },
                                { icon: <Globe className="text-primary" />, title: "Global Reach", desc: "Read in over 50 countries." },
                                { icon: <Shield className="text-primary" />, title: "Verified Reports", desc: "Fact-checked by expert editors." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-colors">
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wide">{item.title}</h4>
                                        <p className="text-zinc-500 text-xs font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-8 rounded-[3rem] shadow-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-primary/30"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Zap size={20} fill="currentColor" />
                                </div>
                                <h3 className="font-serif font-black text-xl uppercase italic">Quick Connect</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Join our inner circle of readers. Get breaking news alerts delivered directly to your inbox or WhatsApp before anyone else.
                            </p>
                            <div className="flex flex-col gap-4">
                                <a
                                    href="mailto:asrehazir.web@gmail.com"
                                    className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl text-center flex items-center justify-center gap-2"
                                >
                                    <Mail size={16} /> Contact Editorial Desk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            {/* Hero Section */}
            <div className="pt-32 pb-24 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Legacy</h2>
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-zinc-900 uppercase tracking-tighter leading-[0.85] mb-8">
                        The Voice of <br /><span className="text-primary italic underline decoration-zinc-900/10 decoration-8 underline-offset-[12px]">Journalism</span>
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-2xl max-w-2xl mx-auto font-serif italic py-4 border-y border-zinc-100">
                        "Empowering the community with truth, one story at a time."
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center mt-10">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="inline-block p-3 bg-zinc-900 rounded-2xl text-white shadow-xl">
                            <Info size={32} />
                        </div>
                        <h3 className="text-3xl font-serif font-black text-zinc-900 uppercase leading-tight">
                            Our Journey <span className="text-primary">&</span> Vision
                        </h3>
                    </div>
                    <div className="text-zinc-500 text-lg leading-relaxed space-y-6 font-medium">
                        <p>
                            Founded on the pillars of integrity, transparency, and fearlessness, <span className="text-zinc-900 font-black underline decoration-primary decoration-2">Asre Hazir</span> has evolved from a local news desk to a global digital powerhouse.
                        </p>
                        <p>
                            In an era of misinformation, we serve as a beacon of verified truth. Our mission is to provide journalism that doesn't just report events, but explains the <span className="italic text-primary font-serif">why</span> and the <span className="italic text-primary font-serif">how</span>.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { num: "5M+", label: "Monthly Readers" },
                        { num: "24/7", label: "Active Reporting" },
                        { num: "50+", label: "Target Countries" },
                        { num: "100%", label: "Fact Checked" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 group hover:bg-black hover:text-white transition-all duration-500 flex flex-col justify-end min-h-[160px]">
                            <h4 className="text-4xl font-serif font-black group-hover:scale-110 transition-transform origin-left">{stat.num}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-white transition-colors">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="mt-32 max-w-6xl mx-auto px-4">
                <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-zinc-900"></div>
                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {[
                            { title: "Authenticity", desc: "Every source is cross-verified by our elite editorial panel." },
                            { title: "Inclusion", desc: "Representing diverse voices from every corner of society." },
                            { title: "Innovation", desc: "Using cutting-edge tech to deliver news faster and cleaner." }
                        ].map((v, i) => (
                            <div key={i} className="space-y-4 border-l border-white/10 pl-8">
                                <span className="text-primary font-serif font-black italic text-4xl opacity-50">0{i + 1}</span>
                                <h4 className="text-xl font-black uppercase tracking-tight">{v.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdvertisementsPage() {
    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            {/* Hero Section */}
            <div className="pt-32 pb-24 bg-primary rounded-b-[4rem] px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Megaphone size={48} className="text-white mx-auto mb-6 animate-bounce" />
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-white uppercase tracking-tighter leading-none mb-6">
                        Scale Your <span className="italic underline decoration-white/20 decoration-8 underline-offset-[14px]">Growth</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
                        Leverage the most trusted digital platform to reach millions of high-value readers globally.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 hover:border-primary transition-colors group">
                        <div className="w-16 h-16 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-8 border border-primary/20 group-hover:rotate-12 transition-transform">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-3xl font-serif font-black text-zinc-900 uppercase tracking-tight mb-4">Digital Real Estate</h3>
                        <p className="text-zinc-500 mb-8 font-medium">High-visibility banner slots and native integration across our web and mobile apps.</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Premium Header Banners (970x90)",
                                "Sidebar High-CTR Slots (300x250)",
                                "Mobile Application Sticky Ads",
                                "In-Article Native Placements"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700 items-baseline">
                                    <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-white/5 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center text-primary mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                            <PenTool size={32} />
                        </div>
                        <h3 className="text-3xl font-serif font-black text-white uppercase tracking-tight mb-4 text-white">Content Synergy</h3>
                        <p className="text-zinc-500 mb-8 font-medium">Directly engage with our readers through professionally crafted sponsored narratives.</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Featured Brand Stories",
                                "Exclusive Press Coverage",
                                "Product Reviews & Launch Spotlights",
                                "Newsletter Sponsor Sections"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-zinc-400 items-baseline">
                                    <CheckCircle2 size={14} className="text-primary shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 p-12 md:p-20 bg-zinc-50 rounded-[4rem] text-center border-2 border-dashed border-gray-200">
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-zinc-900 uppercase tracking-tighter mb-6">Partner <span className="text-primary italic">With Us</span></h2>
                    <p className="text-zinc-500 max-w-xl mx-auto mb-10 text-lg font-medium">Ready to showcase your brand to the world? Contact our sales desk for a customized media kit and pricing plan.</p>
                    <a href="mailto:asrehazir.web@gmail.com" className="inline-flex items-center gap-3 bg-primary text-white font-black px-12 py-5 rounded-2xl uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-primary/20 active:scale-95">
                        <Mail size={18} /> Get Media Kit & Pricing
                    </a>
                </div>
            </div>
        </div>
    );
}

export function GuestColumnsPage() {
    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                                <div className="w-10 h-0.5 bg-primary"></div> Submit Your Art
                            </span>
                            <h1 className="text-6xl font-serif font-black text-zinc-900 uppercase leading-none tracking-tighter">
                                Write for the <br /> <span className="text-primary italic underline decoration-zinc-100 decoration-8 underline-offset-8">Global Archive</span>
                            </h1>
                        </div>
                        <div className="prose prose-zinc lg:prose-xl font-serif italic text-zinc-500">
                            "Thinking is easy, acting is difficult, and to put one's thoughts into action is the most difficult thing in the world."
                        </div>
                        <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                            Asre Hazir is looking for fresh perspectives, bold investigative pieces, and deep analytical essays. If you have a story that needs to be told, our desk is open for submissions.
                        </p>

                        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">Submission Requirements</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: <CheckCircle2 size={20} className="text-primary" />, t: "Word Count", d: "800 - 1500 words" },
                                    { icon: <CheckCircle2 size={20} className="text-primary" />, t: "Originality", d: "100% Unique content" },
                                    { icon: <CheckCircle2 size={20} className="text-primary" />, t: "Media", d: "High-res author photo" },
                                    { icon: <CheckCircle2 size={20} className="text-primary" />, t: "Format", d: "Word or Google Doc" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 items-center">
                                        {item.icon}
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-zinc-400">{item.t}</p>
                                            <p className="text-sm font-bold text-zinc-900">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 w-full sticky top-32">
                        <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden">
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-serif font-black uppercase italic mb-8 border-b border-white/5 pb-4">Send Your Pitch</h3>
                            <div className="space-y-6">
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Our editorial team reviews every pitch carefully. Please allow 3-5 business days for a response from the desk.
                                </p>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Editor's Inbox</p>
                                    <a href="mailto:asrehazir.web@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">asrehazir.web@gmail.com</a>
                                </div>
                                <div className="pt-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Popular Topics</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Geopolitics", "Economy", "Tech Ethics", "Social Reform", "Middle East", "Innovation"].map(t => (
                                            <span key={t} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold border border-white/5">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-zinc-900 uppercase tracking-tighter">Privacy <span className="text-primary">Charter</span></h1>
                </div>

                <div className="prose prose-zinc max-w-none space-y-12 text-zinc-600 leading-relaxed font-medium">
                    <section className="space-y-4">
                        <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight flex items-center gap-3">
                            <div className="w-6 h-1 bg-primary"></div> User Data Integrity
                        </h3>
                        <p>At Asre Hazir, your numeric and personal identity is treated with the highest level of encryption. We collect essential information such as email addresses for newsletter subscriptions & basic browsing telemetry to improve your aesthetic and functional experience.</p>
                    </section>

                    <section className="space-y-4 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                        <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Information Application</h3>
                        <ul className="space-y-3 list-none p-0">
                            {[
                                "Synchronizing personalized news feeds.",
                                "Analytical research for portal optimization.",
                                "Critical communication for security alerts.",
                                "Verified advertisement personalization."
                            ].map((li, i) => (
                                <li key={i} className="flex gap-3 items-center text-sm">
                                    <CheckCircle2 size={16} className="text-primary shrink-0" /> {li}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight flex items-center gap-3">
                            <div className="w-6 h-1 bg-primary"></div> Cybersecurity & Protection
                        </h3>
                        <p>Our server architecture utilizes multi-layer firewalls and industry-leading SSL certificates. We never monetize or sell individual user profiles to third-party data brokers. Your privacy is not a feature; it's a fundamental broadcast right.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Scale size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-zinc-900 uppercase tracking-tighter">Usage <span className="text-primary">Protocols</span></h1>
                </div>

                <div className="space-y-12">
                    {[
                        { t: "01. Content Jurisdiction", d: "All broadcasts, media recordings, and narratives displayed on Asre Hazir are protected by international copyright laws. Unauthorized scraping or mirroring is strictly monitored." },
                        { t: "02. Narrative Accuracy", d: "While our newsroom operates on real-time pulses, we aim for absolute precision. However, news is dynamic; we reserve the right to update narratives as verification cycles complete." },
                        { t: "03. Ethical Conduct", d: "Engagement on our platform (via comments or forums) must adhere to our zero-tolerance policy for hate speech, defamation, or malicious misinformation." },
                        { t: "04. Limitation of Claims", d: "Asre Hazir serves as an informational portal. We are not liable for individual interpretations or independent actions taken based on our news analysis." }
                    ].map((item, idx) => (
                        <div key={idx} className="group p-10 rounded-[3rem] border border-zinc-100 hover:border-primary transition-all duration-500">
                            <h3 className="text-xl font-black text-zinc-900 uppercase mb-4 group-hover:text-primary transition-colors tracking-tight">{item.t}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">{item.d}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-zinc-900 rounded-3xl text-center text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                    Effective Cycle: February 2026 — Present
                </div>
            </div>
        </div>
    );
}
