
import { Clock, ChevronRight, PlayCircle, Film, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';

export function EntertainmentPage() {
    const { news, loading, formatTime } = useNews('Entertainment', 20);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const featured = news[0] ? {
        id: news[0].id,
        title: news[0].title,
        excerpt: news[0].content.substring(0, 200) + '...',
        image: news[0].imageUrl,
        time: formatTime(news[0].createdAt),
        category: news[0].category
    } : null;

    const gridItems = news.slice(1, 9).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt),
        image: item.imageUrl,
        category: item.category
    }));

    const listItems = news.slice(9, 15).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt),
        category: item.category
    }));

    return (
        <div className="flex flex-col w-full font-serif pt-6 pb-12">

            {/* 1. PAGE HEADER */}
            <div className="w-full px-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-6 text-center">
                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-accent">Entertainment</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-secondary dark:text-gray-100 uppercase tracking-tight mb-4">
                    Entertainment
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-base leading-relaxed max-w-2xl mx-auto">
                    Your daily dose of cinema, celebrity gossip, music, OTT reviews, and cultural events. From Tollywood to Hollywood, we cover it all.
                </p>
            </div>

            <div className="w-full px-4 flex flex-col gap-12">
                {/* 2. FEATURED STORY */}
                {featured ? (
                    <Link to={`/news/${featured.id}`} className="w-full grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 bg-gray-50 dark:bg-white/5 md:bg-transparent group cursor-pointer border border-gray-100 dark:border-white/10 md:border-none block">
                        {/* Image - 8 Cols */}
                        <div className="md:col-span-8 h-[300px] md:h-[500px] relative overflow-hidden bg-gray-200 dark:bg-white/5">
                            {featured.image ? (
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-sans uppercase text-sm tracking-widest">
                                    No Image
                                </div>
                            )}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
                                    {featured.category || "Entertainment"}
                                </span>
                            </div>
                        </div>

                        {/* Content - 4 Cols */}
                        <div className="md:col-span-4 flex flex-col justify-center p-6 md:p-0">
                            <h2 className="text-3xl font-bold leading-tight text-secondary dark:text-gray-100 mb-4 group-hover:text-accent transition-colors">
                                {featured.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                                {featured.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
                                <Clock size={12} />
                                <span>{featured.time}</span>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="text-center py-12 text-gray-500 font-sans">
                        No featured entertainment news available.
                    </div>
                )}

                {/* 3. MAIN GRID (4 Cols) */}
                {gridItems.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-white/10 pt-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Film className="text-accent" size={20} />
                            <h3 className="text-xl font-bold text-secondary dark:text-gray-100 uppercase tracking-wide">Latest Hits</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {gridItems.map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-col gap-3 cursor-pointer block">
                                    {/* Image Container (Fixed Height) */}
                                    <div className="w-full h-48 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-300 font-sans text-xs uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                        {/* Category Badge Floating */}
                                        <span className="absolute bottom-0 left-0 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col">
                                        <h4 className="text-base font-bold leading-tight text-secondary dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                                            <Clock size={10} className="mr-1" />
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. SECONDARY FEED (Vertical List - Wide) */}
                {listItems.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-white/10 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-12">
                            <div className="flex items-center gap-2 mb-6">
                                <Music className="text-accent" size={20} />
                                <h3 className="text-xl font-bold text-secondary dark:text-gray-100 uppercase tracking-wide">More News</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                {listItems.map((item) => (
                                    <Link key={item.id} to={`/news/${item.id}`} className="flex items-center gap-3 border-b border-gray-50 dark:border-white/5 pb-3 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 p-2 -mx-2 rounded transition-colors group cursor-pointer block">
                                        <PlayCircle size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-accent flex-shrink-0" />
                                        <div className="flex flex-col">
                                            <h5 className="text-sm font-bold text-secondary dark:text-gray-200 leading-snug line-clamp-1 group-hover:text-accent transition-colors">
                                                {item.title}
                                            </h5>
                                            <div className="flex gap-2 text-[10px] items-center mt-1">
                                                <span className="text-accent font-bold uppercase">{item.category}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-gray-400 font-sans uppercase">{item.time}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
