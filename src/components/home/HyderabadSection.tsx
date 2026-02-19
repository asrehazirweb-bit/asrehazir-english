import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

interface NewsItem {
    id: number | string;
    title: string;
    image?: string;
    time: string;
    category?: string;
    excerpt?: string;
}

interface HyderabadSectionProps {
    featured: NewsItem;
    items: NewsItem[];
}

export function HyderabadSection({ featured, items }: HyderabadSectionProps) {
    // Ensure we have 8 items for the grid
    const gridItems = items.slice(0, 8);

    return (
        <section className="flex flex-col w-full mb-12 font-serif border-b border-gray-100 pb-8 transition-colors">

            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-8 bg-accent"></div>
                    <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">
                        Hyderabad
                    </h2>
                </div>
                <Link to="/deccan" className="flex items-center gap-1 text-sm font-bold text-accent hover:text-secondary transition-colors uppercase tracking-wide">
                    More Hyderabad News <ChevronRight size={14} />
                </Link>
            </div>

            <div className="flex flex-col gap-8">

                {/* === B. FEATURED STORY === */}
                <Link to={`/news/${featured.id}`} className="group cursor-pointer flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Container - Fixed Dimensions */}
                    <div className="w-full md:w-7/12 h-[260px] overflow-hidden relative bg-gray-100">
                        <img
                            src={featured.image || "/api/placeholder/800/450"}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-0 bottom-0 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                            {featured.category || "Hyderabad"}
                        </span>
                    </div>

                    {/* Content Container - Fixed Height for alignment */}
                    <div className="flex-1 flex flex-col h-[260px] py-1">
                        <h3 className="text-xl md:text-2xl font-bold leading-tight text-secondary mb-3 group-hover:underline decoration-accent decoration-2 underline-offset-4 line-clamp-2">
                            {featured.title}
                        </h3>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4 line-clamp-3">
                            {featured.excerpt || "Click to read the full story. This summary is truncated to maintain layout stability across all screen sizes and content lengths."}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
                            <Clock size={12} className="mr-1" />
                            <span>{featured.time}</span>
                        </div>
                    </div>
                </Link>

                {/* === C. NEWS FEED (2 Cols, 8 Items) === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-gray-100">
                    {gridItems.map((item) => (
                        <Link key={item.id} to={`/news/${item.id}`} className="group flex gap-3 items-start h-20 overflow-hidden">
                            {/* Fixed Thumbnail */}
                            <div className="w-24 h-20 flex-shrink-0 bg-gray-100 relative">
                                <img
                                    src={item.image || "/api/placeholder/100/100"}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center h-full py-0.5 w-full">
                                <h4 className="text-sm font-bold text-secondary leading-snug line-clamp-2 group-hover:text-accent transition-colors mb-1.5">
                                    {item.title}
                                </h4>
                                <div className="text-[10px] text-gray-400 font-sans uppercase tracking-wider flex items-center">
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
