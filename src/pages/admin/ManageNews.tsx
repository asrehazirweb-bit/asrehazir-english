import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Edit2, Trash2, Search, Filter, Calendar, User, ExternalLink, Copy } from 'lucide-react';
import { useNews, type NewsArticle } from '../../hooks/useNews';
import EditNewsModal from '../../components/admin/EditNewsModal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

const ManageNews: React.FC = () => {
    const { news, loading, formatTime } = useNews('All', 100);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // New state for modal and toast
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; imageUrl?: string }>({
        isOpen: false,
        id: null,
        imageUrl: undefined
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleDeleteClick = (id: string, imageUrl?: string) => {
        setDeleteModal({ isOpen: true, id, imageUrl });
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsDeleting(true);
        try {
            // 1. Delete from Firestore
            await deleteDoc(doc(db, 'news', deleteModal.id));

            // 2. Delete from Storage if image exists and is not a placeholder
            if (deleteModal.imageUrl && !deleteModal.imageUrl.includes('placeholder')) {
                try {
                    const imageRef = ref(storage, deleteModal.imageUrl);
                    await deleteObject(imageRef);
                } catch (storageErr) {
                    console.error("Error deleting image from storage:", storageErr);
                }
            }
            setToast({ message: 'Article deleted successfully', type: 'success' });
            setDeleteModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting article:", error);
            setToast({ message: 'Failed to delete article', type: 'error' });
        } finally {
            setIsDeleting(false);
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
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
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
                            {filteredNews.map((item) => (
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
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-end gap-2 text-right">
                                            <button onClick={() => window.open(`/news/${item.id}`, '_blank')} className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 transition-all"><ExternalLink size={16} /></button>
                                            <button onClick={() => handleCopyLink(item.id)} className={`p-3 rounded-xl transition-all ${copiedId === item.id ? 'bg-green-500 text-white' : 'bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600'}`}><Copy size={16} /></button>
                                            <button onClick={() => setEditingArticle(item)} className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 transition-all"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteClick(item.id, item.imageUrl)} className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-50 dark:divide-zinc-800">
                    {loading ? (
                        <div className="p-20 text-center text-gray-400">Loading archives...</div>
                    ) : filteredNews.length > 0 ? (
                        filteredNews.map((item) => (
                            <div key={item.id} className="p-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 border-t border-gray-50 dark:border-zinc-800 pt-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => window.open(`/news/${item.id}`, '_blank')} className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-500"><ExternalLink size={14} /></button>
                                        <button onClick={() => handleCopyLink(item.id)} className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-500"><Copy size={14} /></button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setEditingArticle(item)} className="p-2 rounded-lg bg-blue-50 dark:bg-blue-600/10 text-blue-600"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDeleteClick(item.id, item.imageUrl)} className="p-2 rounded-lg bg-red-50 dark:bg-red-600/10 text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center text-gray-400 uppercase text-[10px] font-black tracking-widest">No matching archives</div>
                    )}
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

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Article"
                message="Are you sure you want to delete this article? This action cannot be undone."
                confirmText="Delete Permanently"
                isLoading={isDeleting}
            />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ManageNews;
