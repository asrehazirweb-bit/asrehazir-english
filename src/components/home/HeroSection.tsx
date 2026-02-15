import { Link } from 'react-router-dom';
import MediaRenderer from '../ui/MediaRenderer';

interface NewsItem {
    id: number | string;
    title: string;
    category: string;
    image: string;
    time: string;
    excerpt?: string;
    type?: 'image' | 'video';
    mediaUrl?: string;
    videoUrl?: string;
}

interface HeroSectionProps {
    leadStory: NewsItem;
    className?: string; // Allow custom classes
}

export function HeroSection({ leadStory, className = "" }: HeroSectionProps) {
    return (
        <Link to={`/news/${leadStory.id}`} className={`relative w-full block mb-16 group cursor-pointer border-b border-gray-100 dark:border-white/5 pb-12 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5 ${className}`}>
            {/* Image/Video Container */}
            <div className="relative aspect-video sm:aspect-[21/10] w-full overflow-hidden mb-10 bg-gray-100 dark:bg-white/5 rounded-xl shadow-inner">
                <MediaRenderer
                    type={leadStory.type}
                    mediaUrl={leadStory.mediaUrl}
                    imageUrl={leadStory.image}
                    videoUrl={leadStory.videoUrl}
                    alt={leadStory.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    showVideoIcon={leadStory.type === 'video' || leadStory.videoUrl ? true : false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 bg-red-700 text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl backdrop-blur-sm bg-opacity-90 rounded-sm">
                    {leadStory.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-6 max-w-5xl px-2">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                    <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.3em]">Lead Story</span>
                </div>
                <h1 className="font-serif font-black text-3xl md:text-6xl lg:text-7xl leading-[1.05] text-gray-900 dark:text-gray-50 group-hover:text-red-700 transition-colors duration-400 tracking-tight">
                    {leadStory.title}
                </h1>
                <p className="font-sans text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mt-2 opacity-80 font-medium">
                    {leadStory.excerpt}
                </p>
                <div className="mt-2 flex items-center gap-5 text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em]">
                    <span className="flex items-center gap-2 hover:text-red-700 transition-colors">
                        By <span className="font-black text-gray-900 dark:text-white border-b border-red-700/30">Asre Hazir Desk</span>
                    </span>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                    <span>{leadStory.time}</span>
                </div>
            </div>
        </Link>
    );
}
