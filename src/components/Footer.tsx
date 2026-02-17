import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full bg-secondary dark:bg-[#0a0807] text-white pt-16 pb-8 mt-16 px-8 border-t-4 border-accent transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-2xl font-serif font-bold mb-6 text-accent">ASRE HAZIR</h2>
                    <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                        A leading editorial voice providing in-depth analysis, breaking news, and perspectives on local and global affairs. Dedicated to truth and journalistic integrity.
                    </p>
                    <div className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Asre Hazir. All rights reserved.
                    </div>
                </div>

                <div className="col-span-1 border-t border-gray-700 pt-6 md:pt-0 md:border-t-0">
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">Sections</h3>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'World News', path: '/world', img: '/images/city_night.png' },
                            { name: 'National News', path: '/national', img: '/images/assembly.png' },
                            { name: 'Deccan News', path: '/deccan', img: '/images/charminar_traffic.png' },
                            { name: 'Articles & Essays', path: '/articles-essays', img: '/images/hero.png' },
                            { name: 'Sports & Entertainment', path: '/sports-entertainment', img: '/images/numaish.png' },
                            { name: 'Crime & Accidents', path: '/crime-accidents', img: '/images/rain_traffic.png' }
                        ].map((sec) => (
                            <li key={sec.name}>
                                <Link to={sec.path} className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 bg-gray-800 flex-shrink-0 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <img src={sec.img} alt={sec.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm text-gray-300 font-serif group-hover:text-white transition-colors">
                                        {sec.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-2 bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">Our Presence</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-sans">
                        You can find us across multiple platforms. For urgent news tips, please use our editorial email or phone number listed. Our desk is active 24/7 to bring you the latest verified reports.
                    </p>
                    <div className="space-y-4 font-sans mb-8">
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">WhatsApp Broadcast</h4>
                            <p className="text-sm font-bold">+91 40 1234 5678</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Office Hours</h4>
                            <p className="text-sm font-bold">Mon - Sat: 10:00 AM - 08:00 PM</p>
                        </div>
                    </div>
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Instagram size={18} /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans uppercase tracking-wide">
                <div className="flex gap-6">
                    <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
                <div>
                    Designed & Developed for Stability.
                </div>
            </div>
        </footer>
    );
}
