import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Menu, Facebook, Instagram, X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AdBlock } from './home/AdBlock';

export function Header() {
    const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Live', path: '/live', isLive: true },
        { label: 'World', path: '/world' },
        { label: 'National', path: '/national' },
        { label: 'Hyderabad', path: '/deccan?sub=Hyderabad' },
        { label: 'Telangana', path: '/deccan?sub=Telangana' },
        { label: 'Andhra Pradesh', path: '/deccan?sub=Andhra Pradesh' },
        { label: 'Photos', path: '/photos' },
        { label: 'Videos', path: '/videos' },
        { label: 'Articles & Essays', path: '/articles-essays' },
        { label: 'Sports & Entertainment', path: '/sports-entertainment' },
        { label: 'Crime & Accidents', path: '/crime-accidents' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Contact Us', path: '/contact' },
    ];

    // Lock background scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-effect border-b border-gray-200/50 shadow-lg'
                : 'bg-stone-50 border-b border-gray-100'
                }`}>
                {/* Search Overlay */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-50 bg-white flex items-center px-4 md:px-6">
                        <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto flex items-center gap-4">
                            <Search className="text-gray-400" size={24} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search news, topics, keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-serif text-gray-900"
                            />
                            <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-500 hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </form>
                    </div>
                )}

                {/* Top Bar */}
                {!isScrolled && (
                    <div className="hidden md:block border-b border-gray-100 py-2">
                        <div className="w-full mx-auto px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
                            <div className="flex gap-4 items-center text-gray-400">
                                <span>{currentDate}</span>
                                <span className="text-gray-300">|</span>
                                <a href="https://asrehazir-urdu.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 uppercase font-black hover:text-primary transition-all">
                                    Urdu Portal
                                </a>
                                <span className="text-gray-300">|</span>
                                <a href="https://asre-hazir-epaper.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 uppercase font-black hover:text-primary transition-colors text-primary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Electronic Edition
                                </a>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex gap-4 items-center text-gray-400">
                                    <a href="https://facebook.com/asrehazir" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                                        <Facebook size={14} />
                                    </a>
                                    <a href="https://x.com/asrehazir" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </a>
                                    <a href="https://instagram.com/asrehazir" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors">
                                        <Instagram size={14} />
                                    </a>
                                    <a href="https://t.me/asrehazir" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition-colors">
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M11.944 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.536 0 11.944 0zm5.412 8.356l-1.84 8.704c-.14.624-.51.776-1.034.484l-2.8-2.064-1.352 1.304c-.148.148-.272.272-.56.272l.204-2.888 5.256-4.752c.228-.204-.048-.32-.348-.12l-6.496 4.092-2.8-.876c-.608-.192-.62-.608.128-.904l10.94-4.216c.504-.184.944.116.796.876z" /></svg>
                                    </a>
                                    <a href="https://whatsapp.com/channel/asrehazir" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Branding */}
                <div className={`w-full mx-auto px-4 md:px-6 transition-all duration-300 ${isScrolled ? 'py-1.5 md:py-2' : 'py-3 md:py-10'}`}>
                    <div className="flex justify-between items-center relative gap-4">
                        <button className="md:hidden p-1.5 -ml-1 text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu size={22} />
                        </button>

                        <Link to="/" className="md:absolute md:left-1/2 md:-translate-x-1/2 group transition-transform duration-300 active:scale-95">
                            <img
                                src="/images/asrehazirlogo.jpeg"
                                alt="Asre Hazir"
                                className={`${isScrolled ? 'h-8 md:h-12' : 'h-14 sm:h-18 md:h-24'} w-auto transition-all duration-300 object-contain`}
                            />
                        </Link>

                        <div className="flex items-center gap-1 md:gap-4 ml-auto md:ml-0">
                            <div className="hidden md:flex items-center gap-2 mr-4">
                                <a href="https://asre-hazir-epaper.vercel.app" target="_blank" rel="noreferrer" className="px-4 py-2 border-2 border-primary text-primary rounded-xl font-black uppercase text-[10px] hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10">E-Paper</a>
                                <a href="https://asrehazir-urdu.vercel.app" target="_blank" rel="noreferrer" className="px-4 py-2 bg-zinc-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black transition-all shadow-xl shadow-zinc-900/10">اردو پورٹل</a>
                            </div>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-gray-500 hover:text-primary transition-all"
                            >
                                <Search size={22} className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                            </button>
                            <Link to="/login" className="hidden sm:block bg-gray-100 text-gray-900 px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Header Ad Slot */}
                {!isScrolled && (
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-4">
                        <AdBlock placement="header" className="h-20 sm:h-24 !my-0" label="Premium Header Ad" />
                    </div>
                )}

                {/* Navigation */}
                <nav className={`w-full border-t border-gray-100 py-1 hidden md:block`}>
                    <ul className="flex justify-center items-center gap-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    className={`px-5 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition-colors relative group
                                        ${'isLive' in item && item.isLive
                                            ? 'text-red-600 hover:text-red-700'
                                            : 'text-gray-700 hover:text-primary'
                                        }`}
                                >
                                    {'isLive' in item && item.isLive ? (
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping flex-shrink-0"></span>
                                            {item.label}
                                        </span>
                                    ) : item.label}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${'isLive' in item && item.isLive ? 'bg-red-600' : 'bg-primary'}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </header >

            {/* Mobile Sidebar Navigation - Moved outside header to avoid sticky/glass container issues */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Sidebar Content */}
                    <div
                        className="absolute top-0 left-0 w-[85%] h-full bg-white shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-left duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-inherit z-10">
                            <h2 className="font-serif font-black text-2xl text-primary">Menu</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-900 transition-transform active:rotate-90">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-6 space-y-8">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block">Navigation</span>
                                <ul className="flex flex-col gap-1">
                                    {menuItems.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block py-3 text-lg font-bold text-gray-800 hover:text-primary active:translate-x-1 transition-all"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Sections (As requested) */}
                            <div className="pt-6 border-t border-gray-100">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block">Quick Links</span>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        { name: 'India updates', path: '/national' },
                                        { name: 'Hyderabad guide', path: '/deccan' },
                                        { name: 'Sports & Showbiz', path: '/sports-entertainment' },
                                        { name: 'Crime reports', path: '/crime-accidents' }
                                    ].map((item, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-transparent hover:border-primary/30 group transition-all"
                                            >
                                                <span className="text-sm font-bold text-gray-700 group-hover:text-primary">{item.name}</span>
                                                <ChevronRight size={14} className="text-gray-400 group-hover:text-primary" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6">
                                {/* Portal Links for Mobile */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <a
                                        href="https://asre-hazir-epaper.vercel.app"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 font-black uppercase text-xs rounded-xl hover:bg-primary hover:text-white transition-all"
                                    >
                                        📰 E-Paper
                                    </a>
                                    <a
                                        href="https://asrehazir-urdu.vercel.app"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 font-black text-sm rounded-xl hover:bg-black transition-all"
                                    >
                                        اردو پورٹل
                                    </a>
                                </div>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center bg-primary text-white py-4 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
                                >
                                    Admin Login
                                </Link>
                            </div>

                        </div>

                        {/* Footer in menu */}
                        <div className="mt-auto p-8 text-center border-t border-gray-50 bg-gray-50/50">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asre Hazir Desk © 2026</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
