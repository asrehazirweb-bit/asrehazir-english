import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

interface NewsItem {
    id: number | string;
    title: string;
    image?: string;
    time: string;
    category?: string;
    excerpt?: string;
    titleFont?: string;
    contentFont?: string;
}

interface TelanganaSectionProps {
    featured: NewsItem;
    items: NewsItem[];
}

export function TelanganaSection({ featured, items }: TelanganaSectionProps) {
    // 6 items for the grid
    const gridItems = items.slice(0, 6);

    return (
        <section className="flex flex-col w-full mb-12 font-serif border-b border-gray-100 dark:border-white/10 pb-8 transition-colors">

            <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-2 md:w-3 h-6 md:h-8 bg-accent"></div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-secondary dark:text-gray-100 uppercase">
                        Deccan News
                    </h2>
                </div>
                <Link to="/deccan" className="flex items-center gap-1 text-[10px] md:text-sm font-bold text-accent hover:text-secondary dark:hover:text-gray-200 transition-colors uppercase tracking-wide">
                    More <span className="hidden sm:inline">Deccan News</span> <ChevronRight size={14} />
                </Link>
            </div>

            <div className="flex flex-col gap-8">

                {/* === B. FEATURED STORY === */}
                <Link to={`/news/${featured.id}`} className="group cursor-pointer flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Container - Fixed Aspect Ratio */}
                    <div className="w-full md:w-7/12 aspect-video overflow-hidden relative bg-gray-100 dark:bg-white/5">
                        <img
                            src={featured.image || "/images/charminar_traffic.png"}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-0 bottom-0 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                            {featured.category || "Deccan"}
                        </span>
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 flex flex-col justify-center h-full pt-2">
                        <h3 className={`text-xl md:text-2xl font-bold leading-tight text-secondary dark:text-white mb-3 group-hover:underline decoration-accent decoration-2 underline-offset-4 ${featured.titleFont || ''}`}>
                            {featured.title}
                        </h3>
                        <p className={`text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-4 line-clamp-3 ${featured.contentFont || ''}`}>
                            {featured.excerpt || "No summary available for this story. Click to read the full article and get more details on this developing story."}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
                            <Clock size={12} className="mr-1" />
                            <span>{featured.time}</span>
                        </div>
                    </div>
                </Link>

                {/* === C. NEWS GRID (2 Columns, 6 Items) === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-gray-100 dark:border-white/10">
                    {gridItems.map((item) => (
                        <Link key={item.id} to={`/news/${item.id}`} className="group flex gap-4 items-start h-24">
                            {/* Fixed Thumbnail */}
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                                <img
                                    src={item.image || "/api/placeholder/100/100"}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between h-full py-0.5">
                                <h4 className={`text-sm font-bold text-secondary dark:text-gray-200 leading-snug line-clamp-3 group-hover:text-accent transition-colors ${item.titleFont || ''}`}>
                                    {item.title}
                                </h4>
                                <div className="text-[10px] text-gray-400 font-sans uppercase tracking-wider flex items-center mt-auto">
                                    <Clock size={10} className="mr-1" />
                                    {item.time}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section >
    );
}
