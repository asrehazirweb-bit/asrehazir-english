import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, ChevronRight } from 'lucide-react';
import { AdBlock } from './AdBlock';

interface NewsItem {
    id: number | string;
    title: string;
    time: string;
    image?: string;
    category?: string;
    titleFont?: string;
    contentFont?: string;
}

interface SidebarProps {
    offbeatItems: NewsItem[];
    topStories?: NewsItem[];
}

export function Sidebar({ offbeatItems = [], topStories = [] }: SidebarProps) {
    // Ensure exactly 4 offbeat items
    const displayOffbeat = [...offbeatItems];
    const MOCK_OFFBEAT = {
        id: 0,
        title: "Offbeat News Headline Placeholder",
        time: "1 hour ago"
    };
    while (displayOffbeat.length < 4) {
        displayOffbeat.push({ ...MOCK_OFFBEAT, id: 9990 + displayOffbeat.length });
    }
    const gridOffbeat = displayOffbeat.slice(0, 4);

    // Increase Top Stories to 8 items to match height of Hero + Latest News
    let displayTop = [...topStories];
    if (displayTop.length > 0) {
        while (displayTop.length < 8) {
            displayTop = [...displayTop, ...topStories.map((item, idx) => ({
                ...item,
                id: typeof item.id === 'number' ? item.id + 1000 + displayTop.length + idx : `${item.id}-${displayTop.length}-${idx}`
            }))];
        }
    }
    const finalTop = displayTop.slice(0, 8);

    return (
        <div className="flex flex-col gap-8 w-full h-full relative">

            {/* 0. TOP STORIES BLOCK (Static - Scrolls away) */}
            {finalTop.length > 0 && (
                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5">
                    <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#B27B1E]"></div>
                        <h2 className="text-secondary dark:text-gray-300 font-sans font-bold uppercase tracking-wider text-sm">Top Stories</h2>
                    </div>
                    <div>
                        {finalTop.map((story, idx) => (
                            <Link key={`${story.id}-${idx}`} to={`/news/${story.id}`} className="p-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex gap-3 group transition-colors block">
                                {story.image && (
                                    <div className="w-[60px] h-[60px] bg-gray-200 dark:bg-white/10 flex-shrink-0 relative overflow-hidden rounded-sm">
                                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center w-full">
                                    <h4 className={`font-bold text-xs leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent transition-colors ${story.titleFont || 'font-serif'}`}>
                                        {story.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-sans mt-1">{story.time}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link
                        to="/world"
                        className="w-full py-4 bg-[#004d99]/10 text-[#004d99] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#004d99]/20 transition-all text-center block"
                    >
                        View All
                    </Link>
                </div>
            )}

            {/* STICKY CONTAINER starts here */}
            {/* This block will stick to the top as user scrolls past Top Stories */}
            <div className="sticky top-4 flex flex-col gap-8">

                {/* 1. OFFBEAT BLOCK */}
                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5">
                    <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#004d99]"></div>
                        <h2 className="text-secondary dark:text-gray-300 font-sans font-bold uppercase tracking-wider text-sm">Offbeat</h2>
                    </div>

                    <div className="flex flex-col">
                        {gridOffbeat.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="p-4 border-b border-gray-100 dark:border-white/5 last:border-0 relative pl-8 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group block">
                                <div className="absolute left-4 top-6 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-colors"></div>
                                <span className="text-[10px] text-gray-400 font-sans mb-1 block">{item.time}</span>
                                <h3 className={`font-bold text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent dark:group-hover:text-accent transition-colors ${item.titleFont || 'font-serif'}`}>
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. SOCIAL STATS CARD */}
                <div className="flex w-full h-[100px]">
                    <div className="flex-1 bg-[#4267B2] text-white flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <Facebook size={24} className="mb-2" />
                        <span className="font-bold text-sm">1.4M</span>
                        <span className="text-[10px] uppercase opacity-80">Fans</span>
                    </div>
                    <div className="flex-1 bg-[#000000] text-white flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <Twitter size={24} className="mb-2" />
                        <span className="font-bold text-sm">40.4K</span>
                        <span className="text-[10px] uppercase opacity-80">Followers</span>
                    </div>
                    <div className="flex-1 bg-[#FF0000] text-white flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <Youtube size={24} className="mb-2" />
                        <span className="font-bold text-sm">1.9M</span>
                        <span className="text-[10px] uppercase opacity-80">Subscribers</span>
                    </div>
                </div>

                <AdBlock placement="sidebar" className="h-[250px] !my-0" label="Premium Sidebar Ad" />

                {/* 3. DISCOVER MORE CARD */}
                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                    <h3 className="text-secondary dark:text-gray-200 font-serif font-bold text-lg mb-6 border-b border-gray-100 dark:border-white/10 pb-2">Discover more</h3>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'World News', path: '/world' },
                            { name: 'National News', path: '/national' },
                            { name: 'Deccan News', path: '/deccan' },
                            { name: 'Articles & Essays', path: '/articles-essays' },
                            { name: 'Sports & Entertainment', path: '/sports-entertainment' },
                            { name: 'Crime & Accidents', path: '/crime-accidents' }
                        ].map((item, idx) => (
                            <li key={idx}>
                                <Link to={item.path} className="flex items-center justify-between group cursor-pointer">
                                    <span className="text-sm font-sans text-gray-600 dark:text-gray-400 group-hover:text-red-700 transition-colors">{item.name}</span>
                                    <ChevronRight size={16} className="text-gray-400 group-hover:text-red-700 transition-colors" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
