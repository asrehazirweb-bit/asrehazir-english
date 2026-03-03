import { useParams } from 'react-router-dom';
import { Sidebar } from '../components/home/Sidebar';
import { IndiaNewsFeed } from '../components/india/IndiaNewsFeed';
import { useNews } from '../hooks/useNews';

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export function CategoryPage() {
    const { categoryName, subCategory } = useParams();
    const displayTitle = subCategory || categoryName || 'News';

    // Fetch more to allow for client-side filtering
    const { news: allNews, loading, formatTime } = useNews('All', 100);
    const sideBarNews = useNews('All', 8);

    // Dynamic filtering logic
    const filteredNews = allNews.filter(item => {
        const itemCat = item.category || '';
        const itemSubCat = item.subCategory || '';

        // Exact match for category and subcategory if provided
        if (subCategory) {
            return itemCat === categoryName && itemSubCat === subCategory;
        }

        if (categoryName) {
            // Check if it matches the main category
            if (itemCat === categoryName) return true;

            // Legacy mapping fallback for common categories
            const cat = categoryName.toLowerCase();
            const itemCatLower = itemCat.toLowerCase();

            if (cat === 'hyderabad' || cat === 'deccan news') {
                return itemCatLower.includes('deccan') || itemCatLower.includes('hyderabad') || itemCatLower.includes('telangana') || itemCatLower.includes('andhra pradesh');
            }
            if (cat === 'national news') {
                return itemCatLower.includes('national') || itemCatLower.includes('india');
            }
            if (cat === 'world news') {
                return itemCatLower.includes('world') || itemCatLower.includes('international') || itemCatLower.includes('middle east');
            }
            if (cat === 'articles & essays') {
                return itemCatLower.includes('articles') || itemCatLower.includes('essays');
            }
            if (cat === 'sports & entertainment') {
                return itemCatLower.includes('sports') || itemCatLower.includes('entertainment');
            }
            if (cat === 'crime & accidents') {
                return itemCatLower.includes('crime') || itemCatLower.includes('accident');
            }
        }

        return false;
    });

    const mappedNews = filteredNews.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: stripHtml(item.content).substring(0, 150) + '...',
        image: item.imageUrl,
        location: item.category || 'News',
        subCategory: item.subCategory,
        videoUrl: (item as any).videoUrl,
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
                    <div className="mb-8 border-b-2 border-primary pb-2 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                        <div>
                            {subCategory && (
                                <div className="flex items-center gap-2 text-[10px] font-sans font-black uppercase tracking-widest text-gray-400 mb-1">
                                    <span>{categoryName}</span>
                                    <span>/</span>
                                </div>
                            )}
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                                {displayTitle}
                            </h1>
                        </div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500">
                            Asre Hazir Special Coverage
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="space-y-0">
                            <IndiaNewsFeed items={mappedNews} />
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 font-sans italic">No reports found in {displayTitle} at this time.</p>
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

