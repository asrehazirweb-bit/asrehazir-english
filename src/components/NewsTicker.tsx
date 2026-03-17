
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

interface TickerItem {
    id: string;
    title: string;
}

interface NewsTickerProps {
    items: TickerItem[];
}

export function NewsTicker({ items }: NewsTickerProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="w-full bg-white border-b border-gray-100 overflow-hidden flex items-stretch h-10">
            {/* BREAKING Label */}
            <div className="flex-shrink-0 bg-primary text-white px-4 flex items-center gap-2 z-10">
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    Breaking
                </span>
            </div>

            {/* Scrolling Track Container */}
            <div className="flex-1 overflow-hidden relative flex items-center">
                <div className="flex items-center whitespace-nowrap animate-ticker">
                    {/* Render triple for absolute seamlessness */}
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0">
                            {items.map((item) => (
                                <div key={`${i}-${item.id}`} className="flex items-center shrink-0">
                                    <Link
                                        to={`/news/${item.id}`}
                                        className="text-[13px] font-bold text-gray-800 hover:text-primary transition-colors px-6 whitespace-nowrap"
                                    >
                                        {item.title}
                                    </Link>
                                    <span className="text-primary font-black mx-2">•</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
