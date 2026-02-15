import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Menu, Facebook, Twitter, Instagram, Moon, Sun, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

export function Header() {
    const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggle } = useDarkMode();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'World', path: '/world' },
        { label: 'National', path: '/national' },
        { label: 'Deccan', path: '/deccan' },
        { label: 'Articles & Essays', path: '/articles-essays' },
        { label: 'Sports & Entertainment', path: '/sports-entertainment' },
        { label: 'Crime & Accidents', path: '/crime-accidents' },
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

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-effect border-b border-gray-200/50 dark:border-white/10 shadow-lg'
                : 'bg-white dark:bg-[#0f1115] border-b border-gray-100 dark:border-white/5'
                }`}>
                {/* Top Bar */}
                {!isScrolled && (
                    <div className="hidden md:block border-b border-gray-100 dark:border-white/5 py-2">
                        <div className="w-full mx-auto px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            <div className="flex gap-4 items-center font-medium">
                                <span>{currentDate}</span>
                                <span className="text-gray-300">|</span>
                                <span className="flex items-center gap-1.5 uppercase font-black">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                                    Electronic Edition
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex gap-4">
                                    <Facebook size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                    <Twitter size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                    <Instagram size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                </div>
                                <button onClick={toggle} className="p-1 hover:text-red-700 transition-colors">
                                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Branding */}
                <div className={`w-full mx-auto px-4 md:px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4 md:py-10'}`}>
                    <div className="flex justify-between items-center relative">
                        <button className="md:hidden p-2 -ml-2 text-gray-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu size={24} />
                        </button>

                        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 group transition-transform duration-300 active:scale-95">
                            <h1 className={`${isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl sm:text-4xl md:text-7xl'} font-serif font-black tracking-[-0.04em] leading-none text-gray-900 dark:text-white transition-all duration-300 whitespace-nowrap`}>
                                asre<span className="text-red-700">hazir</span>
                            </h1>
                        </Link>

                        <div className="flex items-center gap-1 md:gap-4">
                            <button className="p-2 text-gray-500 hover:text-red-700 transition-all">
                                <Search size={22} className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                            </button>
                            <Link to="/login" className="hidden sm:block bg-red-600 text-white px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-full hover:bg-black transition-all hover:scale-105 shadow-md">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={`w-full border-t border-gray-100 dark:border-white/5 py-1 hidden md:block`}>
                    <ul className="flex justify-center items-center gap-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-gray-700 dark:text-gray-300 hover:text-red-700 transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 group-hover:w-full"></span>
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
                        className="absolute top-0 left-0 w-[85%] h-full bg-white dark:bg-[#0f1115] shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-left duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/10 sticky top-0 bg-inherit z-10">
                            <h2 className="font-serif font-black text-2xl text-red-700">Menu</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-900 dark:text-white transition-transform active:rotate-90">
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
                                                className="block py-3 text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-red-700 active:translate-x-1 transition-all"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Sections (As requested) */}
                            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
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
                                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-transparent hover:border-red-600/30 group transition-all"
                                            >
                                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-red-700">{item.name}</span>
                                                <ChevronRight size={14} className="text-gray-400 group-hover:text-red-700" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center bg-red-700 text-white py-4 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-red-700/20 active:scale-95 transition-all"
                                >
                                    Admin Login
                                </Link>
                            </div>
                        </div>

                        {/* Footer in menu */}
                        <div className="mt-auto p-8 text-center border-t border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asre Hazir Desk © 2026</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
