import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Menu, Facebook, Twitter, Instagram, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

export function Header() {
    const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark, toggle } = useDarkMode();

    const menuItems = [
        { label: 'World News', path: '/world' },
        { label: 'National News', path: '/national' },
        { label: 'Deccan News', path: '/deccan' },
        { label: 'Articles & Essays', path: '/articles-essays' },
        { label: 'Advertisements', path: '/advertisements' },
        { label: 'Sports & Entertainment', path: '/sports-entertainment' },
        { label: 'Crime & Accidents', path: '/crime-accidents' },
        { label: 'Contact', path: '/contact' },
        { label: 'About Us', path: '/about-us' },
    ];

    return (
        <header className="flex flex-col w-full font-serif border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#0a0807] transition-colors duration-300">
            {/* Top Bar - Minimalistic */}
            <div className="w-full flex justify-between items-center py-2 px-6 text-[10px] md:text-xs tracking-tight text-gray-500 border-b border-gray-100 dark:border-zinc-900 uppercase">
                <div className="flex items-center gap-4 font-medium">
                    <span>{currentDate}</span>
                    <span className="hidden md:inline text-gray-300">|</span>
                    <span className="hidden md:inline">Electronic Edition</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggle}
                            className="p-1 hover:text-red-700 transition-colors"
                            title={isDark ? "Light Mode" : "Dark Mode"}
                        >
                            {isDark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>
                    <div className="hidden sm:flex gap-3 text-gray-400">
                        <Facebook size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                        <Twitter size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                        <Instagram size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>

            {/* Main Branding - Newspaper Masthead */}
            <div className="w-full py-8 md:py-12 flex flex-col items-center relative px-4 text-center">
                {/* Mobile Menu Toggle */}
                <button
                    className="absolute left-6 top-1/2 -translate-y-1/2 md:hidden p-2 text-gray-900 dark:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <Menu size={24} />
                </button>

                <Link to="/" className="text-center group no-underline inline-block">
                    <h1 className="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-none mb-2 text-gray-900 dark:text-white font-serif">
                        asre<span className="text-red-700">hazir</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 w-full max-w-xl mx-auto">
                        <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 flex-grow hidden md:block"></div>
                        <p className="text-[9px] md:text-[11px] font-sans tracking-[0.3em] uppercase text-gray-500 font-bold whitespace-nowrap">
                            Dedicated to Truthful Journalism
                        </p>
                        <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 flex-grow hidden md:block"></div>
                    </div>
                </Link>

                <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-700 transition-all">
                    <Search size={20} />
                </button>
            </div>

            {/* Primary Navigation - Centered, Clean, Rigid */}
            <nav className={`
                w-full border-t border-b border-gray-900 dark:border-zinc-700 py-1
                ${isMenuOpen ? 'block' : 'hidden md:block'}
            `}>
                <ul className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-1 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-zinc-800">
                    {menuItems.map((item) => (
                        <li key={item.label} className="w-full md:w-auto">
                            <Link
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 md:px-5 py-3 md:py-2 text-[11px] md:text-[12px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-500 transition-colors text-center font-sans tracking-tight"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
