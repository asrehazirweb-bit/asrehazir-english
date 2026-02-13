import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Edit2, Trash2, Search, Filter, Calendar, User, ExternalLink, Copy, Check } from 'lucide-react';
import { useNews, type NewsArticle } from '../../hooks/useNews';
import EditNewsModal from '../../components/admin/EditNewsModal';

const ManageNews: React.FC = () => {
    const { news, loading, formatTime } = useNews('All', 100);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleDelete = async (id: string, imageUrl?: string) => {
        if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            try {
                // 1. Delete from Firestore
                await deleteDoc(doc(db, 'news', id));

                // 2. Delete from Storage if image exists and is not a placeholder
                if (imageUrl && !imageUrl.includes('placeholder')) {
                    try {
                        const imageRef = ref(storage, imageUrl);
                        await deleteObject(imageRef);
                    } catch (storageErr) {
                        console.error("Error deleting image from storage:", storageErr);
                    }
                }
                alert('Article deleted successfully');
            } catch (error) {
                console.error("Error deleting article:", error);
                alert('Error deleting article');
            }
        }
    };

    const handleCopyLink = (id: string) => {
        const url = `${window.location.origin}/news/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'World News', 'National News', 'Deccan News', 'Articles & Essays', 'Sports & Entertainment', 'Crime & Accidents'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-1 bg-red-600"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Archive Manager</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white uppercase tracking-tight">Manage Content</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-xl">Efficiency is everything. Edit, update, or permanently remove broadcasted articles from the portal archive.</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row gap-6 items-center shadow-sm">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-red-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search headlines or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white font-sans text-sm"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-red-500 appearance-none dark:text-white text-sm font-bold"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat} Section</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* News List */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 w-24 text-center">Media</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">Broadcast Details</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">Flow Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-zinc-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fetching Archives...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNews.length > 0 ? (
                                filteredNews.map((item) => (
                                    <tr key={item.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-all duration-300">
                                        <td className="p-6">
                                            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm transition-transform group-hover:scale-105">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-6 max-w-md">
                                            <div className="space-y-1">
                                                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">{item.title}</h3>
                                                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                    <span className="flex items-center gap-1"><User size={10} className="text-red-600" /> {item.author || 'Desk'}</span>
                                                    <span className="text-gray-200 dark:text-zinc-800">•</span>
                                                    <span className="flex items-center gap-1"><Calendar size={10} /> {formatTime(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="self-start px-3 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100 dark:border-red-900/20">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest pl-1">
                                                    {item.subCategory || 'General'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-2 text-right">
                                                <button
                                                    onClick={() => window.open(`/news/${item.id}`, '_blank')}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="View Live"
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleCopyLink(item.id)}
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${copiedId === item.id ? 'bg-green-500 text-white' : 'bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'}`}
                                                    title="Copy Public Link"
                                                >
                                                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => setEditingArticle(item)}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="Edit Article"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.imageUrl)}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="Delete Article"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Search size={48} className="text-gray-400 mb-2" />
                                            <p className="text-sm font-serif font-black uppercase italic">No matching archives found</p>
                                            <p className="text-xs text-gray-500 font-sans font-bold">Try adjusting your search filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="p-6 bg-gray-50/50 dark:bg-zinc-800/30 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredNews.length} of {news.length} recordings</span>
                    <div className="flex gap-2">
                        <button disabled className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-300 transition-all">Previous</button>
                        <button disabled className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white transition-all shadow-sm">Next</button>
                    </div>
                </div>
            </div>

            {editingArticle && (
                <EditNewsModal
                    article={editingArticle}
                    onClose={() => setEditingArticle(null)}
                    onSuccess={() => {
                        setEditingArticle(null);
                    }}
                />
            )}
        </div>
    );
};

export default ManageNews;
