
import { Sidebar } from '../components/home/Sidebar';
import { IndiaNewsFeed } from '../components/india/IndiaNewsFeed';
import { useNews } from '../hooks/useNews';

interface CategoryPageProps {
    category: string;
    title: string;
}

export function CategoryPage({ category, title }: CategoryPageProps) {
    // Fetch more to allow for client-side filtering of legacy categories
    const { news: allNews, loading, formatTime } = useNews('All', 100);
    const sideBarNews = useNews('All', 8);

    // Legacy mapping logic
    const filteredNews = allNews.filter(item => {
        if (category === 'Deccan News') {
            return item.category === 'Deccan News' || item.category === 'Hyderabad' || item.category === 'Telangana';
        }
        if (category === 'National News') {
            return item.category === 'National News' || item.category === 'India';
        }
        if (category === 'World News') {
            return item.category === 'World News' || item.category === 'International' || item.category === 'Middle East';
        }
        if (category === 'Articles & Essays') {
            return item.category === 'Articles & Essays' || item.category === 'Business';
        }
        if (category === 'Sports & Entertainment') {
            return item.category === 'Sports & Entertainment' || item.category === 'Entertainment' || item.category === 'Sports';
        }
        if (category === 'Crime & Accidents') {
            return item.category === 'Crime & Accidents' || item.category === 'Crime';
        }
        return item.category === category;
    });

    const mappedNews = filteredNews.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.content.substring(0, 150) + '...',
        image: item.imageUrl,
        location: category,
        subCategory: item.subCategory,
        date: formatTime(item.createdAt)
    }));

    const sidebarTop = sideBarNews.news.slice(0, 4).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt)
    }));

    const sidebarOffbeat = sideBarNews.news.slice(4, 8).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt)
    }));

    return (
        <div className="pt-6 font-serif">
            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* Main Content - 8 Columns */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="mb-8 border-b-2 border-red-700 pb-2 flex justify-between items-end">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            {title}
                        </h1>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 hidden md:block">
                            Asre Hazir Special Coverage
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="space-y-0">
                            <IndiaNewsFeed items={mappedNews} />
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-gray-200 dark:border-zinc-800">
                            <p className="text-gray-500 font-sans italic">No reports found in {title} at this time.</p>
                        </div>
                    )}

                </div>

                {/* Sidebar - 4 Columns */}
                <div className="lg:col-span-4">
                    <Sidebar
                        offbeatItems={sidebarOffbeat}
                        topStories={sidebarTop}
                    />
                </div>

            </div>
        </div>
    );
}
