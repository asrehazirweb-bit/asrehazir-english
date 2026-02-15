
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FeedItem {
    id: string | number;
    title: string;
    excerpt: string;
    image?: string;
    location?: string;
    subCategory?: string;
    date: string;
}

interface IndiaNewsFeedProps {
    items: FeedItem[];
}

export function IndiaNewsFeed({ items }: IndiaNewsFeedProps) {
    return (
        <div className="flex flex-col w-full font-serif">

            {/* 1. PAGE HEADER */}
            <div className="w-full mb-8 border-b border-gray-200 pb-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-400">News</span>
                    <ChevronRight size={10} />
                    <span className="text-accent">India</span>
                </div>

                {/* Title & Description */}
                <h1 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
                    India
                </h1>
                <p className="text-gray-600 font-sans text-base leading-relaxed max-w-3xl">
                    Comprehensive coverage of national affairs, politics, policy decisions, and social developments shaping the nation. Stay updated with in-depth reporting from across the country.
                </p>
            </div>
            {/* 2. NEWS LIST (VERTICAL FEED) */}
            <div className="flex flex-col gap-8">
                {items.map((article) => (
                    <Link key={article.id} to={`/news/${article.id}`} className="group flex flex-col md:flex-row gap-6 border-b border-gray-100 dark:border-zinc-800 pb-8 last:border-0 last:pb-0 block cursor-pointer">
                        {/* LEFT: Article Image (Fixed Container) */}
                        <div className="w-full md:w-[260px] h-[160px] flex-shrink-0 bg-gray-100 dark:bg-zinc-900 relative overflow-hidden rounded-lg">
                            {article.image ? (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                />
                            ) : (
                                /* Empty Neutral Container - Layout stability */
                                <div className="w-full h-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
                                    <span className="text-gray-300 dark:text-gray-700 font-sans text-xs uppercase tracking-widest">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Content */}
                        <div className="flex flex-col py-1">
                            <div className="flex items-center gap-2 mb-2">
                                {article.subCategory && (
                                    <span className="bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                                        {article.subCategory}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-xl font-bold leading-tight text-secondary dark:text-gray-100 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-3 line-clamp-3">
                                {article.excerpt}
                            </p>

                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
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
