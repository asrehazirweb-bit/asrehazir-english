
import { TelanganaSection } from '../components/home/TelanganaSection';
import { Sidebar } from '../components/home/Sidebar';
import { useNews } from '../hooks/useNews';

export function TelanganaPage() {
    const { news, loading, formatTime } = useNews('Hyderabad', 20); // Using Hyderabad category for Telangana page as well
    const sideBarNews = useNews('All', 5);

    const featuredData = news.length > 0 ? {
        id: news[0].id,
        title: news[0].title,
        image: news[0].imageUrl,
        category: news[0].category,
        time: formatTime(news[0].createdAt),
        excerpt: news[0].content.substring(0, 150) + '...'
    } : null;

    const newsList = news.slice(1).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt),
        image: item.imageUrl
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
                        Telangana News
                    </h1>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : news.length > 0 ? (
                        <TelanganaSection
                            featured={featuredData!}
                            items={newsList}
                        />
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No news found in Telangana category.
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
