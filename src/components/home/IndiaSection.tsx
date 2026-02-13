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

interface IndiaSectionProps {
    featured: NewsItem;
    items: NewsItem[];
}

export function IndiaSection({ featured, items }: IndiaSectionProps) {
    // Exactly 10 items for the text list
    const listItems = items.slice(0, 10);

    return (
        <section className="flex flex-col w-full mb-12 font-serif border-b border-gray-100 dark:border-white/10 pb-8 transition-colors">

            {/* === A. SECTION HEADER === */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-8 bg-accent"></div>
                    <h2 className="text-2xl font-black tracking-tight text-secondary dark:text-gray-100 uppercase">
                        India
                    </h2>
                </div>
                <Link to="/national" className="flex items-center gap-1 text-sm font-bold text-accent hover:text-secondary dark:hover:text-gray-200 transition-colors uppercase tracking-wide">
                    More National News <ChevronRight size={14} />
                </Link>
            </div>

            <div className="flex flex-col gap-6">

                {/* === B. FEATURED STORY === */}
                {/* Text below image layout for variety, or Side-by-side depending on pref. 
                    Going with Side-by-side to keep height controlled as per 'medium thumbnail'. 
                */}
                <Link to={`/news/${featured.id}`} className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-gray-100 dark:border-white/10 block">
                    <div className="w-full sm:w-5/12 h-48 overflow-hidden relative bg-gray-100 dark:bg-white/5 flex-shrink-0">
                        <img
                            src={featured.image || "/images/assembly.png"}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-0 bottom-0 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                            {featured.category || "National"}
                        </span>
                    </div>

                    <div className="flex flex-col h-full py-1">
                        <h3 className="text-xl font-bold leading-tight text-secondary dark:text-gray-100 mb-3 group-hover:underline decoration-accent decoration-2 underline-offset-4 line-clamp-2">
                            {featured.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-3 line-clamp-3">
                            {featured.excerpt || "Click to read the full story. This summary is truncated to maintain layout stability across all screen sizes and content lengths."}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
                            <Clock size={12} className="mr-1" />
                            <span>{featured.time}</span>
                        </div>
                    </div>
                </Link>

                {/* === C. NEWS FEED (Text List, 10 Items) === */}
                <div className="flex flex-col">
                    {listItems.map((item) => (
                        <Link key={item.id} to={`/news/${item.id}`} className="group flex items-start py-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 -mx-2 cursor-pointer block">
                            {/* Bullet styled as a small square or dot */}
                            <div className="mt-1.5 mr-3 w-1.5 h-1.5 bg-gray-300 group-hover:bg-accent flex-shrink-0 transition-colors"></div>

                            <div className="flex flex-col w-full">
                                <h4 className="text-sm font-bold text-secondary dark:text-gray-200 leading-snug line-clamp-1 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h4>
                                <div className="flex items-center mt-1">
                                    <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider flex items-center">
                                        {item.time}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
