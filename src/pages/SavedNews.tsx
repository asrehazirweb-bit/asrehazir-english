import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedNews, unsaveNewsArticle, type SavedNewsItem } from '../lib/savedNews';
import { Bookmark, BookmarkX, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedNews: React.FC = () => {
    const { user } = useAuth();
    const [savedNews, setSavedNews] = useState<SavedNewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetchSavedNews();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchSavedNews = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const news = await getSavedNews(user.uid);
            setSavedNews(news);
        } catch (error) {
            console.error('Error fetching saved news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnsave = async (newsId: string) => {
        if (!user) return;

        try {
            setRemoving(newsId);
            await unsaveNewsArticle(user.uid, newsId);
            setSavedNews(prev => prev.filter(item => item.newsId !== newsId));
        } catch (error) {
            console.error('Error removing saved news:', error);
            alert('Failed to remove article');
        } finally {
            setRemoving(null);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <BookmarkX size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Login Required
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please login to view your saved articles
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading saved articles...</p>
                </div>
            </div>
        );
    }

    if (savedNews.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        No Saved Articles
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You haven't saved any articles yet. Start saving articles to read them later!
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        Browse News
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Bookmark size={32} className="text-red-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Saved Articles
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {savedNews.length} {savedNews.length === 1 ? 'article' : 'articles'} saved
                    </p>
                </div>

                {/* Saved News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedNews.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.category && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Metadata */}
                                {item.createdAt && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <Calendar size={14} />
                                        <span>
                                            Saved on {new Date(item.createdAt.toDate()).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/news/${item.newsId}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        Read Article
                                    </Link>
                                    <button
                                        onClick={() => handleUnsave(item.newsId)}
                                        disabled={removing === item.newsId}
                                        className="p-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
                                        title="Remove from saved"
                                    >
                                        {removing === item.newsId ? (
                                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Trash2 size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedNews;

