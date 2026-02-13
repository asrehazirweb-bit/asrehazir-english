
import { Sidebar } from '../components/home/Sidebar';
import { BusinessFeed } from '../components/business/BusinessFeed';
import { useNews } from '../hooks/useNews';

export function BusinessPage() {
    const { news, loading, formatTime } = useNews('Business', 20); // Using Business category
    const sideBarNews = useNews('All', 5);

    const featuredData = news.length > 0 ? {
        id: news[0].id,
        title: news[0].title,
        excerpt: news[0].content.substring(0, 150) + '...',
        image: news[0].imageUrl,
        source: 'Business',
        time: formatTime(news[0].createdAt),
        category: news[0].category
    } : null;

    const newsList = news.slice(1, 6).map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.content.substring(0, 120) + '...',
        source: item.category,
        time: formatTime(item.createdAt),
        image: item.imageUrl
    }));

    const marketBriefs = news.slice(6, 14).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt)
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
                <div className="lg:col-span-8 flex flex-col focus:outline-none">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : news.length > 0 ? (
                        <BusinessFeed
                            featured={featuredData!}
                            newsItems={newsList}
                            marketBriefs={marketBriefs}
                        />
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No news found in Business category.
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
