import { HeroSection } from '../components/home/HeroSection';
import { TelanganaSection } from '../components/home/TelanganaSection';
import { NewsSection, VideoSection } from '../components/home/NewsSection';
import { Sidebar as HomeSidebar } from '../components/home/Sidebar';
import { AdBlock } from '../components/home/AdBlock';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { RegionalAndOffbeatSection } from '../components/home/RegionalAndOffbeatSection';
import { CategoryFeatureSection, CategoryGridSection } from '../components/home/CategoryFeatureSection';
import { useNews } from '../hooks/useNews';

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export function Home() {
    const { news, loading, formatTime } = useNews('All', 50);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Process news into sections
    const heroNews = news.slice(0, 6);
    const heroLeadStory = heroNews[0] ? {
        id: heroNews[0].id,
        title: heroNews[0].title,
        category: heroNews[0].category,
        image: heroNews[0].imageUrl,
        time: formatTime(heroNews[0].createdAt),
        excerpt: stripHtml(heroNews[0].content).substring(0, 200) + '...',
        titleFont: heroNews[0].titleFont,
        contentFont: heroNews[0].contentFont
    } : null;

    const heroTopStories = heroNews.slice(1).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt),
        titleFont: item.titleFont
    }));

    const latestNewsItems = news.slice(0, 10).map(item => ({
        id: item.id,
        location: item.category,
        title: item.title,
        excerpt: stripHtml(item.content).substring(0, 120) + '...',
        titleFont: item.titleFont
    }));

    const telanganaNews = news.filter(n => n.category === 'Deccan News' || n.category === 'Hyderabad' || n.category === 'Telangana');
    const telanganaFeature = telanganaNews[0] ? {
        id: telanganaNews[0].id,
        title: telanganaNews[0].title,
        image: telanganaNews[0].imageUrl,
        category: telanganaNews[0].category,
        time: formatTime(telanganaNews[0].createdAt),
        excerpt: stripHtml(telanganaNews[0].content).substring(0, 150) + '...',
        titleFont: telanganaNews[0].titleFont
    } : null;

    const telanganaList = telanganaNews.slice(1, 7).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt),
        image: item.imageUrl,
        titleFont: item.titleFont
    }));


    const regionalItems = news.slice(10, 16).map(item => ({
        id: item.id,
        time: formatTime(item.createdAt),
        title: item.title,
        image: item.imageUrl,
        titleFont: item.titleFont
    }));

    const offbeatItems = news.slice(16, 18).map(item => ({
        id: item.id,
        time: formatTime(item.createdAt),
        title: item.title,
        titleFont: item.titleFont
    }));

    const worldNews = news.filter(n => n.category === 'World News' || n.category === 'International').slice(0, 2).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt),
        titleFont: item.titleFont
    }));

    return (
        <div className="pt-6">

            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* === LEFT CONTENT COLUMN (8 Columns) === */}
                <div className="lg:col-span-8 flex flex-col">

                    {/* 1. Hero */}
                    {heroLeadStory && <HeroSection leadStory={heroLeadStory} />}

                    {/* 2. Latest News */}
                    <div className="mb-12">
                        <AdBlock placement="between_news" className="h-24 md:hidden mb-12" label="Breaking News Ad" />
                        <LatestNewsSection items={latestNewsItems} />
                    </div>

                    {/* 3. Telangana Section */}
                    {telanganaFeature && (
                        <TelanganaSection
                            featured={telanganaFeature}
                            items={telanganaList}
                        />
                    )}

                    {/* Regional (South) */}
                    <RegionalAndOffbeatSection regionalItems={regionalItems} />

                    {/* 4. India / Stats */}
                    <CategoryFeatureSection
                        tabs={['National', 'International', 'Regional']}
                        allNews={news}
                        formatTime={formatTime}
                    />

                    {/* 5. Articles & Essays */}
                    <CategoryGridSection
                        category="Articles & Essays"
                        items={news.filter(n => n.category === 'Articles & Essays' || n.category === 'Business' || n.category === 'Technology')}
                        formatTime={formatTime}
                    />

                    <AdBlock placement="between_news" className="h-32 md:hidden mb-12" label="Inside Story Ad" />

                </div>

                {/* === RIGHT SIDEBAR COLUMN (4 Columns) === */}
                <div className="lg:col-span-4">
                    <HomeSidebar
                        topStories={heroTopStories}
                        offbeatItems={offbeatItems}
                    />
                </div>

            </div>

            {/* === SPORTS & ENTERTAINMENT SECTION (Full Width Layout) === */}
            <div className="w-full bg-gray-50 py-12 mb-12 transition-colors border-y border-gray-100">
                <div className="w-full mx-auto px-4">
                    <CategoryGridSection
                        category="Sports & Entertainment"
                        items={news.filter(n => n.category === 'Sports & Entertainment' || n.category === 'Entertainment' || n.category === 'Sports')}
                        formatTime={formatTime}
                    />
                </div>
            </div>

            {/* === AD BLOCK === */}
            <AdBlock className="h-40 mb-12" label="Premium Banner Ad" />

            {worldNews.length > 0 && (
                <div className="w-full mx-auto px-4 mb-12">
                    <NewsSection title="National & World" items={worldNews} />
                </div>
            )}

            <VideoSection items={news.filter(n => n.section === 'Must Watch').slice(0, 3).map(item => ({
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.imageUrl || '',
                time: formatTime(item.createdAt)
            }))} />
        </div>
    );
}
