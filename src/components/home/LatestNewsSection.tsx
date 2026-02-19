import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    excerpt: string;
    location: string;
    titleFont?: string;
    contentFont?: string;
}

interface LatestNewsSectionProps {
    items?: NewsItem[];
}

export function LatestNewsSection({ items = [] }: LatestNewsSectionProps) {
    // Ensure we have exactly 9 items for the 3x3 grid
    // If not provided, we fill with placeholders or repeat
    const displayItems = [...items];
    const MOCK_ITEM = {
        id: 0,
        title: "Loading News Item Title Placeholder For Layout Stability",
        excerpt: "This is a placeholder description to ensure the layout remains stable even if data is missing or loading.",
        location: "New Delhi"
    };

    while (displayItems.length < 9) {
        displayItems.push({ ...MOCK_ITEM, id: 999 + displayItems.length });
    }

    // Trim to exactly 9
    const gridItems = displayItems.slice(0, 9);

    return (
        <section className="w-full bg-white py-8 border-t border-b border-gray-100 mb-12 transition-colors text-center md:text-left">
            <div className="max-w-7xl mx-auto px-4">

                {/* HEADLINE WITH LINES */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-12 md:w-24 h-[1px] bg-gray-300"></div>
                    <h2 className="text-secondary font-sans font-semibold uppercase tracking-wider text-[11px] md:text-sm whitespace-nowrap">
                        Latest News
                    </h2>
                    <div className="w-12 md:w-24 h-[1px] bg-gray-300"></div>
                </div>

                {/* 3x3 GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridItems.map((item, idx) => (
                        <Link
                            key={`${item.id}-${idx}`}
                            to={`/news/${item.id}`}
                            className="bg-white border border-gray-100 p-6 h-auto flex flex-col justify-between hover:border-accent hover:premium-shadow transition-all duration-300 cursor-pointer overflow-hidden group rounded-sm"
                        >
                            <div>
                                <h3 className={`font-black text-lg text-secondary leading-snug mb-3 group-hover:text-accent transition-colors decoration-accent/30 decoration-2 underline-offset-8 group-hover:underline ${item.titleFont || 'font-serif'}`}>
                                    {item.title}
                                </h3>
                                <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-2 opacity-80">
                                    {item.excerpt}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{item.location}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
