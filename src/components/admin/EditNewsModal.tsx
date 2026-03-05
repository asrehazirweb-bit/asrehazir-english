import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { X, Save, Image as ImageIcon, Layout, Type, FileText, Tag, Loader2, List, Hash, Activity, Sparkles } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { type NewsArticle } from '../../hooks/useNews';

interface EditNewsModalProps {
    article: NewsArticle;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = [
    { name: 'World News', subCategories: ['Top Stories', 'Middle East', 'International', 'Diplomacy'] },
    { name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States', 'South India'] },
    { name: 'Deccan News', subCategories: ['Hyderabad', 'Telangana', 'Andhra Pradesh'] },
    { name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'] },
    { name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'] },
    { name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'] },
    { name: 'Photos', subCategories: ['Top Stories', 'Politics', 'Sports', 'Entertainment', 'Events'] },
    { name: 'Videos', subCategories: ['News', 'Events', 'Interviews', 'Viral'] }
];

const LIVE_CATEGORIES = ['World News', 'National News', 'Deccan News', 'Sports & Entertainment'];

const EditNewsModal: React.FC<EditNewsModalProps> = ({ article, onClose, onSuccess }) => {
    const [title, setTitle] = useState(article.title);
    const [subHeadline, setSubHeadline] = useState(article.subHeadline || '');
    const [content, setContent] = useState(article.content);
    const [category, setCategory] = useState(article.category);
    const [subCategory, setSubCategory] = useState(article.subCategory || 'Top Stories');
    const [hashtags, setHashtags] = useState(article.hashtags?.join(', ') || '');
    const [showInLive, setShowInLive] = useState(article.showInLive || article.isLive || false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(article.imageUrl);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(article.imageUrl);
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(article.videoUrl || '');
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);

    const fetchMediaLibrary = async () => {
        setIsMediaLibraryOpen(true);
        try {
            const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(50));
            const snapshot = await getDocs(q);
            const urls = Array.from(new Set(snapshot.docs.map(doc => doc.data().imageUrl).filter(Boolean))) as string[];
            setMediaLibrary(urls);
        } catch (error) {
            console.error("Error fetching media library:", error);
        }
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = CATEGORIES.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0]);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        setExistingImageUrl(null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const [postAdImage, setPostAdImage] = useState<File | null>(null);
    const [postAdImagePreview, setPostAdImagePreview] = useState<string | null>(article.postAdImageUrl || null);
    const [postAdLink, setPostAdLink] = useState(article.postAdLink || '');
    const [existingPostAdUrl, setExistingPostAdUrl] = useState<string | null>(article.postAdImageUrl || null);
    const [isPostAdMediaOpen, setIsPostAdMediaOpen] = useState(false);

    const handlePostAdImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setPostAdImage(file);
        setExistingPostAdUrl(null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostAdImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPostAdImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = existingImageUrl || article.imageUrl;

            if (image) {
                try {
                    const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
                    await uploadBytes(storageRef, image);
                    imageUrl = await getDownloadURL(storageRef);
                } catch (storageErr) {
                    console.error("Storage error during edit:", storageErr);
                    alert("Image upload failed. Updating other content only.");
                }
            }

            let postAdImageUrl = existingPostAdUrl || article.postAdImageUrl || '';
            if (postAdImage) {
                try {
                    const adStorageRef = ref(storage, `ads/${Date.now()}_${postAdImage.name}`);
                    await uploadBytes(adStorageRef, postAdImage);
                    postAdImageUrl = await getDownloadURL(adStorageRef);
                } catch (storageErr) {
                    console.error("Ad image upload error:", storageErr);
                }
            }

            const docRef = doc(db, 'news', article.id);
            await updateDoc(docRef, {
                title,
                subHeadline,
                content,
                category,
                subCategory,
                hashtags: hashtags.split(',').map(s => s.trim()).filter(Boolean),
                showInLive,
                isLive: showInLive, // Keep both for safety
                videoUrl,
                imageUrl,
                postAdImageUrl,
                postAdLink,
                updatedAt: new Date()
            });

            onSuccess();
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Error updating article.');
        } finally {
            setLoading(false);
        }
    };

    const currentSubCategories = CATEGORIES.find(c => c.name === category)?.subCategories || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Modal Header */}
                <div className="bg-zinc-900 p-8 text-white flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                            <Save size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black uppercase italic tracking-tight">Edit Archive</h2>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ID: {article.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-primary hover:text-white transition-all text-zinc-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 md:p-10 space-y-10">

                    {/* Headline */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <Type className="w-3.5 h-3.5 text-primary" /> Archive Headline
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-2xl md:text-3xl font-black border-b-2 border-gray-100 bg-transparent py-4 focus:border-primary outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Sub-Headline */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <List className="w-3.5 h-3.5 text-primary" /> Sub-Headline
                        </label>
                        <input
                            type="text"
                            value={subHeadline}
                            onChange={(e) => setSubHeadline(e.target.value)}
                            className="w-full text-xl font-bold border-b border-gray-100 bg-transparent py-2 focus:border-primary outline-none transition-all text-gray-600"
                            placeholder="Enter sub-headline..."
                        />
                    </div>

                    {/* Hashtags & Live Toggle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 rounded-3xl border border-gray-100">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Hash className="w-3.5 h-3.5 text-primary" /> Hashtags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none text-xs font-bold h-12"
                                placeholder="#politics, #hyderabad..."
                            />
                        </div>
                        <div className="space-y-4 flex flex-col justify-center">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                <Activity className="w-3.5 h-3.5 text-primary" /> Live News
                            </label>
                            <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-xl border border-gray-100 h-12">
                                <span className="font-bold text-xs text-gray-600">Show as Live News</span>
                                <div className="flex items-center gap-4">
                                    {LIVE_CATEGORIES.includes(category) && (
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold">Eligible</span>
                                    )}
                                    <input
                                        type="checkbox"
                                        checked={showInLive}
                                        onChange={(e) => setShowInLive(e.target.checked)}
                                        className="w-5 h-5 accent-primary cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Tag className="w-3.5 h-3.5 text-primary" /> Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-bold text-sm h-14"
                            >
                                {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Layout className="w-3.5 h-3.5 text-primary" /> Subsection
                            </label>
                            <select
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-bold text-sm h-14"
                            >
                                {currentSubCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Video URL (Conditional) */}
                    {category === 'Videos' && (
                        <div className="space-y-4 animate-in slide-in-from-top duration-500">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Tag className="w-3.5 h-3.5 text-primary" /> External Video Link
                            </label>
                            <input
                                type="url"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                                placeholder="Paste video link here"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <FileText className="w-3.5 h-3.5 text-primary" /> Narrative Content
                        </label>
                        <div className="quill-wrapper font-inter">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'clean'],
                                    ],
                                }}
                                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
                                placeholder="Edit narrative content..."
                            />
                        </div>
                    </div>

                    {/* Post Specific Ad */}
                    <div className="space-y-6 bg-zinc-50 p-8 rounded-3xl border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-primary" size={16} />
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">Post Specific Advertisement</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await fetchMediaLibrary();
                                            setIsPostAdMediaOpen(true);
                                        }}
                                        className="text-primary font-bold hover:underline flex items-center gap-1 text-[10px]"
                                    >
                                        <List size={12} /> From Library
                                    </button>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ad Image</label>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${postAdImagePreview || existingPostAdUrl ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                    {postAdImagePreview || existingPostAdUrl ? (
                                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-white">
                                            <img src={postAdImagePreview || existingPostAdUrl || ''} alt="Ad Preview" className="w-full h-full object-contain" />
                                            <button type="button" onClick={() => { setPostAdImage(null); setPostAdImagePreview(null); setExistingPostAdUrl(null); }} className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-[8px] font-black uppercase">Change</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[8rem] cursor-pointer">
                                            <ImageIcon className="w-6 h-6 text-gray-300 mb-2" />
                                            <span className="text-gray-900 font-bold text-[10px]">Select Post Ad</span>
                                            <input type="file" onChange={handlePostAdImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ad Target Link</label>
                                <textarea
                                    value={postAdLink}
                                    onChange={(e) => setPostAdLink(e.target.value)}
                                    className="w-full p-4 rounded-2xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none text-xs font-bold h-[8rem] resize-none"
                                    placeholder="https://example.com/promotion"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Update */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                type="button"
                                onClick={fetchMediaLibrary}
                                className="text-primary font-bold hover:underline flex items-center gap-1 text-xs"
                            >
                                <List size={14} /> Media Library
                            </button>
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <ImageIcon className="w-3.5 h-3.5 text-primary" /> Media Asset
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(imagePreview || existingImageUrl) && (
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                    <img src={imagePreview || existingImageUrl || ''} alt="Current" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Selected Image</span>
                                    </div>
                                </div>
                            )}
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-primary transition-all aspect-video group">
                                <ImageIcon size={24} className="text-gray-300 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-gray-400">Upload New</span>
                                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>
                </form>

                {/* Media Library Modal */}
                {(isMediaLibraryOpen || isPostAdMediaOpen) && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-zinc-900 text-white">
                                <h2 className="text-xl font-black uppercase italic">Select from Library</h2>
                                <button onClick={() => { setIsMediaLibraryOpen(false); setIsPostAdMediaOpen(false); }} className="bg-zinc-800 p-2 rounded-full hover:bg-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                                {mediaLibrary.map((url, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-all"
                                        onClick={() => {
                                            if (isPostAdMediaOpen) {
                                                setExistingPostAdUrl(url);
                                                setPostAdImage(null);
                                                setPostAdImagePreview(null);
                                                setIsPostAdMediaOpen(false);
                                            } else {
                                                setExistingImageUrl(url);
                                                setImage(null);
                                                setImagePreview(null);
                                                setIsMediaLibraryOpen(false);
                                            }
                                        }}
                                    >
                                        <img src={url} alt="Media" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Footer */}
                <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 px-6 rounded-2xl border border-gray-200 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all"
                    >
                        Discard Changes
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] bg-primary hover:bg-black text-white py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Synchronizing...
                            </>
                        ) : (
                            <>
                                <Save size={14} /> Synchronize Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditNewsModal;
