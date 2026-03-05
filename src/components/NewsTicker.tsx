import { useEffect, useRef } from 'react';
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
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track || items.length === 0) return;

        // Clone items for seamless looping
        const clone = track.cloneNode(true) as HTMLDivElement;
        track.parentElement?.appendChild(clone);

        return () => {
            clone.remove();
        };
    }, [items]);

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full bg-white border-b border-gray-100 overflow-hidden flex items-stretch" style={{ height: '40px' }}>
            {/* BREAKING Label */}
            <div className="flex-shrink-0 bg-primary text-white px-4 flex items-center gap-2 z-10">
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    Breaking
                </span>
            </div>

            {/* Separator */}
            <div className="w-px bg-gray-200 flex-shrink-0" />

            {/* Scrolling Track */}
            <div className="flex-1 overflow-hidden relative">
                <div className="flex items-center h-full whitespace-nowrap animate-ticker">
                    {/* Render triple for absolute seamlessness on wider screens */}
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            {items.map((item) => (
                                <span key={`${i}-${item.id}`} className="inline-flex items-center">
                                    <Link
                                        to={`/news/${item.id}`}
                                        className="text-[13px] font-bold text-gray-800 hover:text-primary transition-colors px-8 whitespace-nowrap"
                                    >
                                        {item.title}
                                    </Link>
                                    <span className="text-primary font-black mx-2">•</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
