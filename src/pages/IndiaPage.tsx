
import { Sidebar } from '../components/home/Sidebar';
import { IndiaNewsFeed } from '../components/india/IndiaNewsFeed';
import { useNews } from '../hooks/useNews';

export function IndiaPage() {
    const { news, loading, formatTime } = useNews('India', 20);

    const sideBarNews = useNews('All', 5);

    const mappedNews = news.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.content.substring(0, 150) + '...',
        image: item.imageUrl,
        location: 'India',
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
        <div className="pt-6">
            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* Main Content - 8 Columns */}
                <div className="lg:col-span-8 flex flex-col">
                    <h1 className="text-3xl font-black font-serif text-secondary mb-8 border-b-2 border-accent pb-2 inline-block">
                        India News
                    </h1>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : news.length > 0 ? (
                        <IndiaNewsFeed items={mappedNews} />
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No news found in India category.
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
