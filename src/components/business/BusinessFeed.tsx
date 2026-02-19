
import { Clock, Briefcase, TrendingUp, ChevronRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BusinessItem {
    id: string | number;
    title: string;
    excerpt?: string;
    image?: string;
    source?: string;
    time: string;
    category?: string;
}

interface BusinessFeedProps {
    featured: BusinessItem;
    newsItems: BusinessItem[];
    marketBriefs: BusinessItem[];
}

export function BusinessFeed({ featured, newsItems, marketBriefs }: BusinessFeedProps) {
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
                    <span className="text-accent">Business</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4 text-white">
                    Business
                </h1>
                <p className="text-gray-600 font-sans text-base leading-relaxed max-w-3xl">
                    Comprehensive coverage of the economy, stock markets, corporate world, startup ecosystem, policy decisions, and personal finance.
                </p>
            </div>
            {/* 2. FEATURED BUSINESS STORY */}
            <Link to={`/news/${featured.id}`} className="w-full mb-12 flex flex-col gap-5 border-b border-gray-100 pb-10 block group cursor-pointer">
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
                            No Image
                        </div>
                    )}
                    <span className="absolute left-0 bottom-0 bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5">
                        {featured.category || "Business"}
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 group-hover:text-accent transition-colors">
                        {featured.title}
                    </h2>
                    <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed max-w-4xl line-clamp-3">
                        {featured.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-wide mt-1">
                        {featured.source && (
                            <span className="font-bold text-accent">{featured.source}</span>
                        )}
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{featured.time}</span>
                        </div>
                        <Share2 size={12} className="hover:text-accent cursor-pointer ml-auto md:ml-0" />
                    </div>
                </div>
            </Link>

            <div className="flex flex-col md:flex-row gap-12">

                {/* A. TOP BUSINESS NEWS (Primary Feed) */}
                <div className="flex flex-col gap-8 w-full md:w-7/12">
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-accent" size={18} />
                        <h3 className="text-lg font-bold uppercase tracking-wide text-secondary">Top Stories</h3>
                    </div>

                    {newsItems.map((article) => (
                        <Link key={article.id} to={`/news/${article.id}`} className="group flex flex-col sm:flex-row gap-5 border-b border-gray-100 pb-6 last:border-0 last:pb-0 h-auto block cursor-pointer">
                            {/* Left: Image */}
                            <div className="w-full sm:w-[140px] h-32 sm:h-24 flex-shrink-0 bg-gray-100 relative overflow-hidden">
                                {article.image ? (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-300 font-sans text-[10px] uppercase tracking-widest">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Content */}
                            <div className="flex flex-col py-0.5 justify-between w-full">
                                <div>
                                    <h4 className="text-base font-bold leading-snug text-secondary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <p className="text-gray-500 font-sans text-xs leading-relaxed line-clamp-2 mb-2 hidden sm:block">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                                    {article.source && (
                                        <span className="text-accent font-bold">{article.source}</span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Clock size={10} />
                                        <span>{article.time}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* B. MARKET & ECONOMY BRIEFS (Text-Heavy) */}
                <div className="flex flex-col gap-4 w-full md:w-5/12 border-l border-gray-100 md:pl-8">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-accent" size={18} />
                        <h3 className="text-lg font-bold uppercase tracking-wide text-secondary">Market Briefs</h3>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        {marketBriefs.map((item) => (
                            <Link key={item.id} to={`/news/${item.id}`} className="group flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 transition-colors rounded block">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-bold text-secondary leading-snug group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-sans uppercase mt-1">
                                        {item.time}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Market Widget Placeholder */}
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded text-center">
                        <p className="text-xs text-gray-400 font-sans uppercase tracking-wide mb-1">Market Snapshot</p>
                        <div className="flex justify-between items-center text-sm font-bold text-secondary">
                            <span>SENSEX</span>
                            <span className="text-green-600">71,432 ▲</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-secondary mt-1">
                            <span>NIFTY</span>
                            <span className="text-red-500">21,718 ▼</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
