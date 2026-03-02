import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NewsItem {
    id: string;
    title: string;
    category: string;
    imageUrl?: string;
    content: string;
    createdAt: any;
    titleFont?: string;
    contentFont?: string;
}

interface CategoryFeatureSectionProps {
    tabs: string[];
    allNews: NewsItem[];
    formatTime: (date: any) => string;
}

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export function CategoryFeatureSection({ tabs, allNews, formatTime }: CategoryFeatureSectionProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Standardized filter logic (removed Urdu)
    const getFilteredNews = (tab: string) => {
        const t = tab.toLowerCase();
        if (t === 'national') {
            return allNews.filter(n =>
                n.category === 'National News' ||
                n.category === 'India'
            );
        } else if (t === 'international' || t === 'world') {
            return allNews.filter(n =>
                n.category === 'World News' ||
                n.category === 'International'
            );
        } else if (t === 'regional' || t === 'deccan') {
            return allNews.filter(n =>
                n.category === 'Deccan News' ||
                n.category === 'Regional' ||
                n.category === 'Hyderabad' ||
                n.category === 'Telangana'
            );
        }
        return allNews.filter(n => n.category === tab);
    };

    const currentNews = getFilteredNews(activeTab);
    const featuredItem = currentNews[0];
    const listItems = currentNews.slice(1, 5);

    return (
        <div className="w-full mb-12">
            {/* Header with Tabs */}
            <div className="border-b border-gray-200 flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                py-2 border-b-2 font-sans text-[11px] md:text-sm font-black tracking-widest cursor-pointer uppercase transition-all whitespace-nowrap
                                ${activeTab === tab ? 'border-primary text-secondary' : 'border-transparent text-gray-500 hover:text-gray-800'}
                            `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <Link
                    to={`/category/${activeTab.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:text-black transition-colors shrink-0"
                >
                    View All <ChevronRight size={12} />
                </Link>
            </div>

            {currentNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT: Featured Card */}
                    {featuredItem && (
                        <Link to={`/news/${featuredItem.id}`} className="group cursor-pointer block">
                            <div className="relative aspect-video bg-gray-200 overflow-hidden mb-4 rounded-lg shadow-sm">
                                <img
                                    src={featuredItem.imageUrl || "/images/hero.png"}
                                    alt={featuredItem.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <span className="absolute bottom-4 left-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 shadow-xl">
                                    Featured Report
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">{formatTime(featuredItem.createdAt)}</span>
                            <h3 className={`font-black text-2xl md:text-3xl leading-tight text-gray-900 mb-3 group-hover:text-primary transition-colors ${featuredItem.titleFont || 'font-serif'}`}>
                                {featuredItem.title}
                            </h3>
                            <p className="text-gray-500 font-sans text-sm leading-relaxed line-clamp-2 max-w-xl">
                                {stripHtml(featuredItem.content).substring(0, 150)}...
                            </p>
                        </Link>
                    )}

                    {/* RIGHT: List */}
                    <div className="flex flex-col gap-6">
                        {listItems.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-5 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="w-[140px] aspect-[4/3] bg-gray-200 shrink-0 relative overflow-hidden rounded-md shadow-sm">
                                    <img
                                        src={item.imageUrl || "/images/hero.png"}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{formatTime(item.createdAt)}</span>
                                    <h4 className={`font-bold text-base leading-snug text-gray-900 line-clamp-3 group-hover:text-primary transition-colors ${(item as any).titleFont || 'font-serif'}`}>
                                        {item.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="text-gray-400 font-black text-xs uppercase tracking-[0.3em] italic">
                        News Stream Initializing...
                    </p>
                </div>
            )}
        </div>
    );
}

interface CategoryGridSectionProps {
    category: string;
    items: any[];
    formatTime: (date: any) => string;
}

export function CategoryGridSection({ category, items, formatTime }: CategoryGridSectionProps) {
    const displayItems = items.slice(0, 4);

    return (
        <div className="w-full mb-12">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-primary"></div>
                    <h2 className="text-secondary font-black uppercase tracking-[0.2em] text-sm">{category}</h2>
                </div>
                <Link
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:text-black transition-colors"
                >
                    Explore All <ChevronRight size={12} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {displayItems.map((item, idx) => (
                    <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-6 group cursor-pointer group">
                        <div className="w-[120px] aspect-video bg-gray-200 shrink-0 overflow-hidden relative rounded-md shadow-sm">
                            <img
                                src={item.imageUrl || item.image || "/images/tech_campus.png"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-widest">
                                {item.createdAt ? formatTime(item.createdAt) : item.time}
                            </span>
                            <h4 className={`font-bold text-base leading-snug text-gray-900 line-clamp-2 group-hover:text-primary transition-colors ${item.titleFont || 'font-serif'}`}>
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
