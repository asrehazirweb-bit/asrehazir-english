import { useState } from 'react';
import { Link } from 'react-router-dom';

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

    // Filter logic for tabs
    const getFilteredNews = (tab: string) => {
        const t = tab.toLowerCase();
        if (t === 'national') {
            return allNews.filter(n =>
                n.category === 'National News' ||
                n.category === 'India' ||
                n.category === 'قومی خبریں'
            );
        } else if (t === 'international' || t === 'world') {
            return allNews.filter(n =>
                n.category === 'World News' ||
                n.category === 'International' ||
                n.category === 'عالمی خبریں'
            );
        } else if (t === 'regional' || t === 'deccan') {
            return allNews.filter(n =>
                n.category === 'Deccan News' ||
                n.category === 'Regional' ||
                n.category === 'دکن نیوز' ||
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
            <div className="border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-6 overflow-x-auto no-scrollbar scroll-smooth">
                <div className="flex items-center gap-4 md:gap-8 min-w-max">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                py-2 border-b-2 font-sans text-[11px] md:text-sm font-semibold tracking-wide cursor-pointer uppercase transition-all whitespace-nowrap
                                ${activeTab === tab ? 'border-red-700 text-secondary dark:text-gray-100' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}
                            `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {currentNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT: Featured Big Card */}
                    {featuredItem && (
                        <Link to={`/news/${featuredItem.id}`} className="group cursor-pointer block">
                            <div className="relative aspect-[4/3] bg-gray-200 dark:bg-white/10 overflow-hidden mb-3">
                                <img
                                    src={featuredItem.imageUrl || "/images/hero.png"}
                                    alt={featuredItem.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <span className="absolute bottom-2 right-2 bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-1">
                                    {featuredItem.category}
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-sans block mb-1">{formatTime(featuredItem.createdAt)}</span>
                            <h3 className={`font-black text-lg md:text-xl leading-snug md:leading-tight text-gray-900 dark:text-gray-100 mb-2 group-hover:text-accent transition-colors ${featuredItem.titleFont || 'font-serif'}`}>
                                {featuredItem.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-sans text-xs leading-relaxed line-clamp-2">
                                {stripHtml(featuredItem.content).substring(0, 150)}...
                            </p>
                        </Link>
                    )}

                    {/* RIGHT: List of Items */}
                    <div className="flex flex-col gap-4">
                        {listItems.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-4 group cursor-pointer h-[80px]">
                                <div className="w-[120px] h-full bg-gray-200 dark:bg-white/10 flex-shrink-0 relative overflow-hidden rounded-sm">
                                    <img
                                        src={item.imageUrl || "/images/hero.png"}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col py-0.5">
                                    <span className="text-[10px] text-gray-400 font-sans mb-1">{formatTime(item.createdAt)}</span>
                                    <h4 className={`font-bold text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-3 group-hover:text-accent transition-colors ${(item as any).titleFont || 'font-serif'}`}>
                                        {item.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                        {listItems.length === 0 && !featuredItem && (
                            <div className="flex items-center justify-center h-full text-gray-400 font-sans text-sm uppercase tracking-widest italic">
                                News to be added
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl">
                    <p className="text-gray-400 font-sans text-sm uppercase tracking-[0.2em] italic">
                        News to be added
                    </p>
                </div>
            )}
        </div>
    );
}

// Simple Block for Technology / Entertainment
interface CategoryGridSectionProps {
    category: string;
    items: any[];
    formatTime: (date: any) => string;
}

export function CategoryGridSection({ category, items, formatTime }: CategoryGridSectionProps) {
    const displayItems = items.slice(0, 4); // Limit to 4

    return (
        <div className="w-full mb-12">
            <div className="flex items-center mb-6 border-b border-gray-100 dark:border-white/10 pb-2">
                <div className="w-1.5 h-4 bg-red-700 mr-2"></div>
                <h2 className="text-secondary dark:text-gray-100 font-sans font-bold uppercase tracking-wider text-sm">{category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayItems.map((item, idx) => (
                    <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-4 group cursor-pointer">
                        <div className="w-[100px] h-[70px] bg-gray-200 dark:bg-white/10 flex-shrink-0 overflow-hidden relative rounded-sm">
                            <img
                                src={item.imageUrl || item.image || "/images/tech_campus.png"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-sans mb-1">
                                {item.createdAt ? formatTime(item.createdAt) : item.time}
                            </span>
                            <h4 className={`font-bold text-xs md:text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent transition-colors ${item.titleFont || 'font-serif'}`}>
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
