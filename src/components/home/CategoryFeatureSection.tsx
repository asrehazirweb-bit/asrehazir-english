import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    time: string;
    image?: string;
    excerpt?: string;
}

interface CategoryFeatureSectionProps {
    category: string;
    tabs: string[];
    featuredItem: NewsItem;
    listItems: NewsItem[];
}

export function CategoryFeatureSection({ category, tabs, featuredItem, listItems }: CategoryFeatureSectionProps) {
    // Ensure exactly 4 list items
    const displayList = [...listItems];
    const MOCK_LIST_ITEM = {
        id: 0,
        title: "News Headline Placeholder",
        time: "10 mins ago",
        image: "/images/hero.png"
    };
    while (displayList.length < 4) {
        displayList.push({ ...MOCK_LIST_ITEM, id: 8000 + displayList.length });
    }
    const gridList = displayList.slice(0, 4);

    return (
        <div className="w-full mb-12">
            {/* Header with Tabs */}
            <div className="border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-8">
                    {tabs.map((tab, idx) => (
                        <div
                            key={tab}
                            className={`
                                py-2 border-b-2 font-sans text-sm font-semibold tracking-wide cursor-pointer uppercase
                                ${idx === 0 ? 'border-red-700 text-secondary dark:text-gray-100' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}
                            `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT: Featured Big Card */}
                <Link to={`/news/${featuredItem.id}`} className="group cursor-pointer block">
                    <div className="relative aspect-[4/3] bg-gray-200 dark:bg-white/10 overflow-hidden mb-3">
                        <img
                            src={featuredItem.image || "/images/hero.png"}
                            alt={featuredItem.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute bottom-2 right-2 bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-1">
                            {category}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-sans block mb-1">{featuredItem.time}</span>
                    <h3 className="font-serif font-black text-lg md:text-xl leading-tight text-gray-900 dark:text-gray-100 mb-2 group-hover:text-accent transition-colors">
                        {featuredItem.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-sans text-xs leading-relaxed line-clamp-2">
                        {featuredItem.excerpt}
                    </p>
                </Link>

                {/* RIGHT: List of 4 Items */}
                <div className="flex flex-col gap-4">
                    {gridList.map((item, idx) => (
                        <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-4 group cursor-pointer h-[80px]">
                            <div className="w-[120px] h-full bg-gray-200 dark:bg-white/10 flex-shrink-0 relative overflow-hidden rounded-sm">
                                <img
                                    src={item.image || "/images/hero.png"}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col py-0.5">
                                <span className="text-[10px] text-gray-400 font-sans mb-1">{item.time}</span>
                                <h4 className="font-serif font-bold text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-3 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}

// Simple Block for Technology / Entertainment
interface CategoryGridSectionProps {
    category: string;
    items: NewsItem[];
}

export function CategoryGridSection({ category, items }: CategoryGridSectionProps) {
    const displayItems = items.slice(0, 4); // Limit to 4

    return (
        <div className="w-full mb-12">
            <div className="flex items-center mb-6 border-b border-gray-100 dark:border-white/10 pb-2">
                <div className="w-1.5 h-4 bg-red-700 mr-2"></div>
                <h2 className="text-secondary dark:text-gray-100 font-sans font-bold uppercase tracking-wider text-sm">{category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayItems.map((item, idx) => (
                    <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex gap-4 group cursor-pointer">
                        <div className="w-[100px] h-[70px] bg-gray-200 dark:bg-white/10 flex-shrink-0 overflow-hidden relative rounded-sm">
                            <img
                                src={item.image || "/images/tech_campus.png"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-sans mb-1">{item.time}</span>
                            <h4 className="font-serif font-bold text-xs md:text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent transition-colors">
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
