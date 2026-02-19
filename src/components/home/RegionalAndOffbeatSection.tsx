import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    image?: string;
    time: string;
}

interface RegionalSectionProps {
    regionalItems?: NewsItem[];
}

export function RegionalAndOffbeatSection({ regionalItems = [] }: RegionalSectionProps) {
    // Ensure we have exactly 6 regional items
    const displayRegional = [...regionalItems];
    const MOCK_REGIONAL = {
        id: 0,
        title: "Regional News Headline Placeholder for Layout Stability",
        image: "/images/hero.png", // Assuming this exists or a placeholder
        time: "35 minutes ago"
    };
    while (displayRegional.length < 6) {
        displayRegional.push({ ...MOCK_REGIONAL, id: 1000 + displayRegional.length });
    }
    const gridRegional = displayRegional.slice(0, 6);

    return (
        <div className="w-full bg-white mb-12 transition-colors">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#004d99]"></div>
                    <h2 className="text-secondary font-sans font-bold uppercase tracking-wider text-sm">South India</h2>
                </div>
                <div className="hidden md:flex gap-4 text-xs font-sans text-gray-500 font-medium">
                    {['Andhra Pradesh', 'Bangalore', 'Hyderabad', 'Telangana'].map((tab) => (
                        <span key={tab} className="cursor-pointer hover:text-accent transition-colors">{tab}</span>
                    ))}
                </div>
            </div>

            {/* 6 Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                {gridRegional.map((item, idx) => (
                    <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-4 group cursor-pointer h-[80px]">
                        <div className="w-[120px] h-full bg-gray-200 flex-shrink-0 rounded-sm overflow-hidden relative">
                            <img
                                src={item.image || "/images/hero.png"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-start py-0.5">
                            <span className="text-[10px] text-gray-400 font-sans mb-1 block">{item.time}</span>
                            <h3 className="font-serif font-bold text-sm leading-snug text-gray-800 line-clamp-3 group-hover:text-accent transition-colors">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
