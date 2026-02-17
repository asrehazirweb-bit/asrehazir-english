import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';
import { Image as ImageIcon, Plus, Trash2, ExternalLink, Layout, ToggleLeft, ToggleRight, Loader2, Megaphone, PenTool } from 'lucide-react';
import Toast from '../../components/ui/Toast';

interface Ad {
    id: string;
    imageUrl: string;
    link: string;
    placement: string;
    active: boolean;
    createdAt: any;
}

const PLACEMENTS = [
    { id: 'header', label: 'Header Top (970x90)' },
    { id: 'sidebar', label: 'Sidebar (300x250)' },
    { id: 'between_news', label: 'Between News (Long)' },
    { id: 'footer', label: 'Footer (Static)' }
];

const AdsManagement: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [link, setLink] = useState('');
    const [placement, setPlacement] = useState('sidebar');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [editingAd, setEditingAd] = useState<Ad | null>(null);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const q = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const fetchedAds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
            setAds(fetchedAds);
        } catch (error) {
            console.error("Error fetching ads:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (ad: Ad) => {
        setEditingAd(ad);
        setLink(ad.link);
        setPlacement(ad.placement);
        setImagePreview(ad.imageUrl);
        // We don't set the image file because it's already on Cloudinary
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingAd(null);
        setLink('');
        setPlacement('sidebar');
        setImage(null);
        setImagePreview(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!link) {
            setToast({ message: 'Redirect URL is required', type: 'error' });
            return;
        }

        if (!editingAd && !image) {
            setToast({ message: 'Image is required for new ads', type: 'error' });
            return;
        }

        setUploading(true);
        try {
            let imageUrl = editingAd ? editingAd.imageUrl : '';

            // Only upload new image if one was selected
            if (image) {
                imageUrl = await uploadImage(image, 'ads');
            }

            if (editingAd) {
                // Update existing
                await updateDoc(doc(db, 'ads', editingAd.id), {
                    imageUrl,
                    link,
                    placement,
                });
                setToast({ message: 'Ad updated successfully!', type: 'success' });
            } else {
                // Add new
                await addDoc(collection(db, 'ads'), {
                    imageUrl,
                    link,
                    placement,
                    active: true,
                    createdAt: serverTimestamp()
                });
                setToast({ message: 'Ad added successfully!', type: 'success' });
            }

            cancelEdit();
            fetchAds();
        } catch (error) {
            console.error("Error saving ad:", error);
            setToast({ message: 'Failed to save ad', type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const toggleAdStatus = async (adId: string, currentStatus: boolean) => {
        try {
            await updateDoc(doc(db, 'ads', adId), { active: !currentStatus });
            setAds(ads.map(ad => ad.id === adId ? { ...ad, active: !currentStatus } : ad));
            setToast({ message: 'Status updated', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to update status', type: 'error' });
        }
    };

    const deleteAd = async (adId: string) => {
        if (!window.confirm('Are you sure you want to delete this ad?')) return;
        try {
            await deleteDoc(doc(db, 'ads', adId));
            setAds(ads.filter(ad => ad.id !== adId));
            if (editingAd?.id === adId) cancelEdit();
            setToast({ message: 'Ad deleted', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to delete ad', type: 'error' });
        }
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Megaphone className="text-red-600" size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Marketing Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight uppercase italic leading-none">Ads Manager</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Ad Creation Form */}
                <div className="lg:col-span-12">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 dark:border-zinc-800 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                                {editingAd ? 'Modify Campaign' : 'New Campaign'}
                            </h2>
                            {editingAd && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-black transition-colors"
                                >
                                    Cancel & Exit Edit Mode
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <ExternalLink size={14} className="text-red-600" /> Redirect URL
                                    </label>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:border-red-600 outline-none transition-all dark:text-white font-bold"
                                        required
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Layout size={14} className="text-red-600" /> Ad Placement
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {PLACEMENTS.map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => setPlacement(p.id)}
                                                className={`p-4 rounded-xl border font-black uppercase tracking-tighter text-[10px] transition-all ${placement === p.id
                                                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 scale-[1.02]'
                                                    : 'bg-white dark:bg-zinc-800 border-gray-100 dark:border-zinc-700 text-gray-500 hover:border-red-600/30'}`}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <ImageIcon size={14} className="text-red-600" /> Creative Asset
                                </label>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 h-[240px] flex flex-col items-center justify-center ${imagePreview ? 'border-red-600 bg-red-50/5' : 'border-gray-200 dark:border-zinc-800 hover:border-red-600'}`}>
                                    {imagePreview ? (
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden group bg-gray-50 dark:bg-zinc-950/50 flex items-center justify-center">
                                            <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                            <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black uppercase tracking-widest text-[10px]">Change Asset</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full">
                                            <Plus size={32} className="text-gray-300 mb-2" />
                                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Upload Banner</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-red-600 hover:bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {uploading ? <Loader2 size={24} className="animate-spin" /> : editingAd ? <Layout size={24} /> : <Plus size={24} />}
                            {uploading ? 'Processing Asset...' : editingAd ? 'Update Ad Creative' : 'Deploy Ad Creative'}
                        </button>
                    </form>
                </div>

                {/* Ad Inventory */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="flex items-center gap-3 px-4">
                        <div className="w-1.5 h-6 bg-red-600"></div>
                        <h2 className="text-lg font-black uppercase tracking-tighter dark:text-white">Active Inventory</h2>
                        <span className="text-[10px] font-black bg-gray-100 dark:bg-zinc-800 text-gray-400 px-3 py-1 rounded-full">{ads.length} Slots Filled</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ads.map((ad) => (
                            <div key={ad.id} className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-zinc-950/50 flex items-center justify-center p-4">
                                    <img src={ad.imageUrl} alt="Ad" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                                        {ad.placement.replace('_', ' ')}
                                    </div>
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(ad)}
                                            className="p-2 bg-white/80 backdrop-blur-md text-zinc-900 rounded-xl hover:bg-white transition-all"
                                            title="Edit Ad"
                                        >
                                            <PenTool size={20} />
                                        </button>
                                        <button
                                            onClick={() => toggleAdStatus(ad.id, ad.active)}
                                            className={`p-2 rounded-xl backdrop-blur-md transition-all ${ad.active ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'}`}
                                            title={ad.active ? "Pause Ad" : "Activate Ad"}
                                        >
                                            {ad.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                        </button>
                                        <button
                                            onClick={() => deleteAd(ad.id)}
                                            className="p-2 bg-red-600/80 backdrop-blur-md text-white rounded-xl hover:bg-red-600 transition-all"
                                            title="Delete Ad"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${ad.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {ad.active ? 'Serving' : 'Pauced'}
                                        </span>
                                        <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-sans truncate">{ad.link}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {ads.length === 0 && !loading && (
                        <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-zinc-800">
                            <Megaphone size={48} className="mx-auto text-gray-200 dark:text-zinc-800 mb-4" />
                            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No active ad campaigns</p>
                        </div>
                    )}
                </div>
            </div>

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

export default AdsManagement;
