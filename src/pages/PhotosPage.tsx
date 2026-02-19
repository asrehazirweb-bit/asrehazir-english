
import { Camera, ChevronRight, Share2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PhotoItem {
    id: string | number;
    title: string;
    image?: string;
    count?: number;
    category?: string;
    date: string;
}

// MOCK DATA
const PHOTO_GALLERIES: PhotoItem[] = [
    { id: 'ph-1', title: "In Photos: Grand Republic Day Parade 2026 at Kartavya Path", image: "/images/assembly.png", count: 12, category: "National", date: "1 Day Ago" },
    { id: 'ph-2', title: "Winter Chill: Heavy fog engulfs North India, disrupts flights", image: "/images/hero.png", count: 8, category: "Weather", date: "2 Days Ago" },
    { id: 'ph-3', title: "Ayodhya Ram Mandir: Devotees flock for darshan on anniversary", image: "/images/golconda.png", count: 15, category: "Religion", date: "3 Days Ago" },
    { id: 'ph-4', title: "Hyderabad Numaish 2026: A visual tour of the exhibition", image: "/images/numaish.png", count: 20, category: "City", date: "4 Days Ago" },
    { id: 'ph-5', title: "Glimpses from the Global Investors Summit in Chennai", image: "/images/tech_campus.png", count: 10, category: "Business", date: "5 Days Ago" },
    { id: 'ph-6', title: "Traditional Bullock Cart Race held in rural Telangana", image: "/images/rain_traffic.png", count: 6, category: "Culture", date: "6 Days Ago" },
    { id: 'ph-7', title: "Massive Fire breaks out in industrial area, no casualties", image: "/images/charminar_traffic.png", count: 5, category: "News", date: "1 Week Ago" },
    { id: 'ph-8', title: "Vintage Car Rally: Classic beauties roll out on city streets", image: "/images/hero.png", count: 18, category: "Lifestyle", date: "1 Week Ago" },
    { id: 'ph-9', title: "ISRO prepares for next lunar mission: Behind the scenes", image: "/images/tech_campus.png", count: 7, category: "Science", date: "1 Week Ago" },
    { id: 'ph-10', title: "Cricket World Cup: Fans celebrate India's victory", image: "/images/assembly.png", count: 25, category: "Sports", date: "2 Weeks Ago" },
    { id: 'ph-11', title: "Flower Show at Botanical Gardens attracts thousands", image: "/images/golconda.png", count: 14, category: "Nature", date: "2 Weeks Ago" },
    { id: 'ph-12', title: "Protests erupt in Europe over climate change policies", image: "/images/rain_traffic.png", count: 9, category: "World", date: "2 Weeks Ago" },
];

export function PhotosPage() {
    return (
        <div className="flex flex-col w-full font-serif pt-6 pb-12 bg-white transition-colors">

            {/* PAGE HEADER */}
            <div className="w-full px-4 mb-8 border-b border-gray-200 pb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-accent">Photos</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-secondary uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
                    <Camera size={40} className="text-accent" />
                    Photos
                </h1>
                <p className="text-gray-600 font-sans text-base leading-relaxed max-w-2xl mx-auto">
                    Explore our visual stories capturing the most significant moments in politics, culture, events, and daily life from around the globe.
                </p>
            </div>

            {/* PHOTO GRID */}
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PHOTO_GALLERIES.map((item) => (
                        <article key={item.id} className="group cursor-pointer flex flex-col gap-3">
                            {/* Image Container with Count Badge */}
                            <div className="w-full h-56 bg-gray-100 relative overflow-hidden rounded-sm">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <Camera className="text-gray-400" size={32} />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                                {/* Count Badge */}
                                <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                                    <Layers size={10} />
                                    {item.count} Photos
                                </div>

                                {/* Category Badge */}
                                <div className="absolute bottom-2 left-2">
                                    <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <h2 className="text-base font-bold leading-snug text-secondary group-hover:text-accent transition-colors line-clamp-2">
                                    {item.title}
                                </h2>
                                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                                    <span>{item.date}</span>
                                    <Share2 size={12} className="hover:text-accent" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-12">
                <button className="px-6 py-2 border border-gray-300 text-sm font-bold text-gray-500 hover:bg-gray-50 uppercase tracking-wide transition-colors">
                    Load More Photos
                </button>
            </div>

        </div>
    );
}
