import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    category: string;
    image: string;
    time: string;
    excerpt?: string;
}

interface HeroSectionProps {
    leadStory: NewsItem;
    className?: string; // Allow custom classes
}

export function HeroSection({ leadStory, className = "" }: HeroSectionProps) {
    return (
        <Link to={`/news/${leadStory.id}`} className={`relative w-full block mb-12 group cursor-pointer border-b border-gray-100 dark:border-white/5 pb-10 transition-all duration-500 premium-shadow ${className}`}>
            {/* Image Container */}
            <div className="relative aspect-[21/9] w-full overflow-hidden mb-8 bg-gray-100 dark:bg-white/5 rounded-sm">
                <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-0 left-0 bg-accent text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    {leadStory.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-4 max-w-5xl">
                <div className="flex items-center gap-3 mb-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Top Story</span>
                </div>
                <h1 className="font-serif font-black text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-secondary dark:text-gray-100 group-hover:text-accent transition-colors duration-300 tracking-tight">
                    {leadStory.title}
                </h1>
                <p className="font-sans text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mt-2 opacity-90">
                    {leadStory.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-[10px] text-gray-400 font-sans uppercase tracking-[0.1em]">
                    <span className="flex items-center gap-1.5 hover:text-accent transition-colors">
                        By <span className="font-black text-secondary dark:text-gray-200">Editorial Desk</span>
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{leadStory.time}</span>
                </div>
            </div>
        </Link>
    );
}
