import { Link } from 'react-router-dom';
import { Facebook, Instagram, X } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';
import { AdBlock } from './home/AdBlock';

export function Footer() {
    return (
        <footer className="w-full bg-secondary text-white pt-16 pb-8 mt-16 px-8 border-t-4 border-accent transition-colors">
            <div className="w-full max-w-7xl mx-auto mb-16">
                <AdBlock placement="footer" className="!my-0 h-auto" label="Footer Advertisement" />
            </div>
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

                <div className="col-span-2 bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900">Our Presence</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 font-sans">
                        You can find us across multiple platforms. For urgent news tips, please use our editorial email or phone number listed. Our desk is active 24/7 to bring you the latest verified reports.
                    </p>
                    <div className="space-y-4 font-sans mb-8">
                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">WhatsApp Broadcast</h4>
                            <p className="text-sm font-bold">+91 91215 32805</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-100 flex items-center justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">WhatsApp Broadcast</h4>
                                <p className="text-sm font-bold">Official Channel</p>
                            </div>
                            <div className="flex gap-2">
                                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all" title="Join WhatsApp Channel">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors" title="Facebook"><Facebook size={18} /></a>
                        <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors" title="X">
                            <X size={18} />
                        </a>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors" title="Instagram"><Instagram size={18} /></a>
                        <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors" title="Telegram">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M11.944 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.536 0 11.944 0zm5.412 8.356l-1.84 8.704c-.14.624-.51.776-1.034.484l-2.8-2.064-1.352 1.304c-.148.148-.272.272-.56.272l.204-2.888 5.256-4.752c.228-.204-.048-.32-.348-.12l-6.496 4.092-2.8-.876c-.608-.192-.62-.608.128-.904l10.94-4.216c.504-.184.944.116.796.876z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans uppercase tracking-wide">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
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
