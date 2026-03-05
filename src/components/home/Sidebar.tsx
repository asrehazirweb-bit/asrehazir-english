import { Link } from 'react-router-dom';
import { Facebook, X as XIcon, ChevronRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants/socialLinks';
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
        <div className="flex flex-col gap-8 w-full">

            {/* TOP STORIES BLOCK — always visible at top of sidebar */}
            {finalTop.length > 0 && (
                <div className="border border-gray-100 bg-white">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-primary"></div>
                        <h2 className="text-secondary font-sans font-bold uppercase tracking-wider text-sm">Top Stories</h2>
                    </div>
                    <div>
                        {finalTop.map((story, idx) => (
                            <Link key={`${story.id}-${idx}`} to={`/news/${story.id}`} className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer flex gap-3 group transition-colors block">
                                {story.image && (
                                    <div className="w-[60px] h-[60px] bg-gray-200 flex-shrink-0 relative overflow-hidden rounded-sm">
                                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center w-full">
                                    <h4 className={`font-bold text-xs leading-snug text-gray-800 line-clamp-2 group-hover:text-accent transition-colors ${story.titleFont || 'font-serif'}`}>
                                        {story.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-sans mt-1">{story.time}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* REST OF SIDEBAR — scrollable if taller than viewport */}
            <div className="flex flex-col gap-8 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-0.5">

                {/* 1. OFFBEAT BLOCK */}
                <div className="border border-gray-100 bg-white">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-primary"></div>
                        <h2 className="text-secondary font-sans font-bold uppercase tracking-wider text-sm">Offbeat</h2>
                    </div>

                    <div className="flex flex-col">
                        {gridOffbeat.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="p-4 border-b border-gray-100 last:border-0 relative pl-8 hover:bg-gray-50 transition-colors cursor-pointer group block">
                                <div className="absolute left-4 top-6 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-colors"></div>
                                <span className="text-[10px] text-gray-400 font-sans mb-1 block">{item.time}</span>
                                <h3 className={`font-bold text-sm leading-snug text-gray-800 line-clamp-2 group-hover:text-accent transition-colors ${item.titleFont || 'font-serif'}`}>
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. SOCIAL CARDS */}
                <div className="flex w-full h-[80px]">
                    <a
                        href={SOCIAL_LINKS.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#1877F2] text-white flex flex-col items-center justify-center cursor-pointer hover:shadow-inner transition-all group"
                    >
                        <Facebook size={20} className="mb-px group-hover:scale-110 transition-transform" />
                        <span className="font-sans font-black text-[10px] uppercase tracking-tighter">Facebook</span>
                    </a>
                    <a
                        href={SOCIAL_LINKS.x}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#000000] text-white flex flex-col items-center justify-center cursor-pointer hover:shadow-inner transition-all group"
                    >
                        <XIcon size={20} className="mb-px group-hover:scale-110 transition-transform" />
                        <span className="font-sans font-black text-[10px] uppercase tracking-tighter">Follow on X</span>
                    </a>
                </div>

                <AdBlock placement="sidebar" className="!my-0" label="Premium Sidebar Ad" />

                {/* 3. DISCOVER MORE CARD */}
                <div className="border border-gray-100 bg-white p-6">
                    <h3 className="text-secondary font-serif font-bold text-lg mb-6 border-b border-gray-100 pb-2">Discover more</h3>
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
                                    <span className="text-sm font-sans text-gray-600 group-hover:text-primary transition-colors">{item.name}</span>
                                    <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
