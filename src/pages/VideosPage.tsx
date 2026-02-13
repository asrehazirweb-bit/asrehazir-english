
import { Play, ChevronRight, Clock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoItem {
    id: string | number;
    title: string;
    image?: string;
    duration: string;
    category?: string;
    date: string;
}

// MOCK DATA
const VIDEO_FEED: VideoItem[] = [
    { id: 'vid-1', title: "Exclusive: Chief Minister discusses roadmap for state development", image: "/images/assembly.png", duration: "12:45", category: "Politics", date: "2 Hours Ago" },
    { id: 'vid-2', title: "Ground Report: How the city is dealing with unexpected floods", image: "/images/rain_traffic.png", duration: "05:30", category: "Report", date: "4 Hours Ago" },
    { id: 'vid-3', title: "Tech Watch: Review of the latest smartphone launched today", image: "/images/tech_campus.png", duration: "08:15", category: "Technology", date: "6 Hours Ago" },
    { id: 'vid-4', title: "Cultural Fiesta: Highlights from the annual music festival", image: "/images/numaish.png", duration: "04:20", category: "Culture", date: "8 Hours Ago" },
    { id: 'vid-5', title: "Expert Analysis: Impact of the Union Budget on middle class", image: "/images/hero.png", duration: "15:00", category: "Economy", date: "10 Hours Ago" },
    { id: 'vid-6', title: "Viral: Tiger spotted crossing highway near reserve forest", image: "/images/golconda.png", duration: "01:10", category: "Viral", date: "12 Hours Ago" },
    { id: 'vid-7', title: "Health Tips: Doctor explains how to stay safe during flu season", image: "/images/charminar_traffic.png", duration: "06:50", category: "Health", date: "1 Day Ago" },
    { id: 'vid-8', title: "Cinema Talk: Director reveals secrets behind the blockbuster hit", image: "/images/hero.png", duration: "09:30", category: "Entertainment", date: "1 Day Ago" },
    { id: 'vid-9', title: "Space Mission: ISRO chief on upcoming Gaganyaan launch", image: "/images/tech_campus.png", duration: "03:45", category: "Science", date: "2 Days Ago" }
];

export function VideosPage() {
    return (
        <div className="flex flex-col w-full font-serif pt-6 pb-12 bg-white dark:bg-[#120f0e] transition-colors">

            {/* PAGE HEADER */}
            <div className="w-full px-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-accent">Videos</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-secondary dark:text-gray-100 uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
                    <Video size={40} className="text-accent" />
                    Videos
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-base leading-relaxed max-w-2xl mx-auto">
                    Watch in-depth reports, exclusive interviews, ground realities, and explainer videos on trending topics.
                </p>
            </div>

            {/* VIDEO GRID */}
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VIDEO_FEED.map((item) => (
                        <article key={item.id} className="group cursor-pointer flex flex-col gap-3">
                            {/* Thumbnail Container (16:9 Aspect Ratio) */}
                            <div className="w-full aspect-video bg-gray-900 relative overflow-hidden rounded-sm group-hover:shadow-lg transition-all">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                        <Video className="text-gray-600" size={40} />
                                    </div>
                                )}

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <Play size={20} fill="currentColor" className="ml-1" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                                    {item.duration}
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-secondary/90 dark:bg-accent/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold leading-tight text-secondary dark:text-gray-200 group-hover:text-accent transition-colors line-clamp-2">
                                    {item.title}
                                </h2>
                                <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                                    <Clock size={12} />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-12">
                <button className="px-6 py-2 border border-gray-300 dark:border-white/10 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-wide transition-colors">
                    Load More Videos
                </button>
            </div>

        </div>
    );
}
