
import { Clock, MapPin, ChevronRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface MEFeedItem {
    id: string | number;
    title: string;
    excerpt: string;
    image?: string;
    location?: string;
    date: string;
    category?: string;
}

interface MiddleEastFeedProps {
    featured: MEFeedItem;
    items: MEFeedItem[];
}

export function MiddleEastFeed({ featured, items }: MiddleEastFeedProps) {
    return (
        <div className="flex flex-col w-full font-serif text-secondary transition-colors">

            {/* 1. PAGE HEADER */}
            <div className="w-full mb-8 border-b border-gray-200 pb-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-400">News</span>
                    <ChevronRight size={10} />
                    <span className="text-accent">Middle East</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
                    Middle East
                </h1>
                <p className="text-gray-600 font-sans text-base leading-relaxed max-w-3xl">
                    In-depth coverage of the Middle East region, focusing on geopolitical shifts, diplomacy, conflict resolution, economic developments, and cultural stories shaping the Arab world.
                </p>
            </div>
            {/* 2. FEATURED MIDDLE EAST STORY */}
            <Link to={`/news/${featured.id}`} className="w-full mb-12 flex flex-col gap-4 block group cursor-pointer">
                {/* Image Container */}
                <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-gray-100">
                    {featured.image ? (
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 uppercase text-xs tracking-widest">
                            No Image Available
                        </div>
                    )}
                    <span className="absolute left-0 bottom-0 bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5">
                        {featured.category || "Middle East"}
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-secondary group-hover:text-accent transition-colors max-w-3xl">
                        {featured.title}
                    </h2>
                    <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed max-w-4xl line-clamp-3">
                        {featured.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-wide mt-2">
                        {featured.location && (
                            <div className="flex items-center gap-1">
                                <MapPin size={12} />
                                <span>{featured.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{featured.date}</span>
                        </div>
                        <Share2 size={12} className="hover:text-accent cursor-pointer ml-auto md:ml-0" />
                    </div>
                </div>
            </Link>

            {/* 3. MIDDLE EAST NEWS FEED (Vertical List) */}
            <div className="flex flex-col gap-8">
                {items.map((article) => (
                    <Link key={article.id} to={`/news/${article.id}`} className="group flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 last:pb-0 h-auto sm:h-40 block cursor-pointer">
                        {/* LEFT: Image */}
                        <div className="w-full sm:w-[240px] h-48 sm:h-full flex-shrink-0 bg-gray-100 relative overflow-hidden">
                            {article.image ? (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-300 font-sans text-xs uppercase tracking-widest">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Content */}
                        <div className="flex flex-col flex-1 py-1 h-full justify-between">
                            <div>
                                <h3 className="text-lg font-bold leading-tight text-secondary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 font-sans text-sm leading-relaxed line-clamp-2 mb-2">
                                    {article.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-wide">
                                {article.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        <span>{article.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
