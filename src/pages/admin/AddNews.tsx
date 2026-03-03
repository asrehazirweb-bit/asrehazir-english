import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';
import { Image as ImageIcon, Send, Layout, Type, FileText, Tag, Trash2, Sparkles, CheckCircle2, List, Activity, Hash, Loader, X } from 'lucide-react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

interface CategoryDoc {
    id: string;
    name: string;
    subCategories: string[];
    order: number;
}

// Fallback categories — matches the navbar exactly.
// Used when Firestore rules are not yet configured or collection is empty.
const FALLBACK_CATEGORIES: CategoryDoc[] = [
    { id: 'f1', name: 'World News', subCategories: ['Top Stories', 'Middle East', 'International', 'Diplomacy'], order: 1 },
    { id: 'f2', name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States'], order: 2 },
    { id: 'f3', name: 'Hyderabad', subCategories: ['Local News', 'Crime', 'Politics', 'Business', 'Events'], order: 3 },
    { id: 'f4', name: 'Telangana', subCategories: ['Local News', 'Politics', 'Development', 'Agriculture'], order: 4 },
    { id: 'f5', name: 'Andhra Pradesh', subCategories: ['Local News', 'Politics', 'Development', 'Business'], order: 5 },
    { id: 'f6', name: 'Photos', subCategories: ['Top Stories', 'Politics', 'Sports', 'Entertainment', 'Events'], order: 6 },
    { id: 'f7', name: 'Videos', subCategories: ['News', 'Events', 'Interviews', 'Viral'], order: 7 },
    { id: 'f8', name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'], order: 8 },
    { id: 'f9', name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'], order: 9 },
    { id: 'f10', name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'], order: 10 },
];


const AddNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [subHeadline, setSubHeadline] = useState('');
    const [content, setContent] = useState('');
    const [section, setSection] = useState('Top Stories');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [isLive, setIsLive] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [sendPush, setSendPush] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);

    // Dynamic categories from Firestore
    const [categories, setCategories] = useState<CategoryDoc[]>([]);
    const [catsLoading, setCatsLoading] = useState(true);

    // Modal and toast
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load categories from Firestore in real-time; fall back to defaults on error/empty
    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, 'categories_english'), orderBy('order', 'asc')),
            (snap) => {
                const cats = snap.docs.map(d => ({ id: d.id, ...d.data() })) as CategoryDoc[];
                // If Firestore returns empty, use fallback so dropdown is never blank
                const resolved = cats.length > 0 ? cats : FALLBACK_CATEGORIES;
                setCategories(resolved);
                setCatsLoading(false);
                if (!category) {
                    setCategory(resolved[0].name);
                    setSubCategory(resolved[0].subCategories?.[0] || '');
                }
            },
            (_err) => {
                // Permission denied or network issue — use fallback
                setCategories(FALLBACK_CATEGORIES);
                setCatsLoading(false);
                if (!category) {
                    setCategory(FALLBACK_CATEGORIES[0].name);
                    setSubCategory(FALLBACK_CATEGORIES[0].subCategories[0]);
                }
            }
        );
        return () => unsub();
    }, []);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-draft');
        if (draft) {
            const data = JSON.parse(draft);
            setTitle(data.title || '');
            setSubHeadline(data.subHeadline || '');
            setContent(data.content || '');
            setCategory(data.category || 'World News');
            setSubCategory(data.subCategory || 'Top Stories');
            setSection(data.section || 'Top Stories');
            setVideoUrl(data.videoUrl || '');
            setHashtags(data.hashtags || '');
            setIsLive(data.isLive || false);
            setSendPush(data.sendPush || false);
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-draft', JSON.stringify({
                    title, subHeadline, content, category, subCategory, section, videoUrl, hashtags, isLive, sendPush
                }));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, subHeadline, content, category, subCategory, section, videoUrl, hashtags, isLive, sendPush]);

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

    const handleClearDraftClick = () => {
        setIsClearModalOpen(true);
    };

    const confirmClearDraft = () => {
        setTitle('');
        setSubHeadline('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setExistingImageUrl(null);
        setSection('Top Stories');
        setCategory('World News');
        setSubCategory('Top Stories');
        setVideoUrl('');
        setHashtags('');
        setIsLive(false);
        setSendPush(false);
        localStorage.removeItem('asre-hazir-draft');
        setIsClearModalOpen(false);
        setToast({ message: 'Draft cleared successfully', type: 'success' });
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = categories.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0] || '');
        } else if (val !== 'Other') {
            setSubCategory('General');
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
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = existingImageUrl || '';
            if (image) {
                try {
                    imageUrl = await uploadImage(image, 'english');
                } catch (imgErr: any) {
                    console.error("Image upload error:", imgErr);
                    setToast({ message: `Image upload failed: ${imgErr.message || 'Unknown error'}`, type: 'error' });
                }
            }

            const docData = {
                title,
                subHeadline,
                content,
                section,
                category,
                subCategory,
                hashtags: hashtags.split(',').map(s => s.trim()).filter(Boolean),
                isLive,
                videoUrl,
                imageUrl: imageUrl,
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'Asre Hazir Desk',
                authorId: auth.currentUser?.uid,
                status: 'published'
            };

            const docRef = await addDoc(collection(db, 'news'), docData);

            // Trigger Push Notification record if requested
            if (sendPush) {
                await addDoc(collection(db, 'notifications'), {
                    title: 'New Story Published',
                    message: title,
                    articleId: docRef.id,
                    createdAt: serverTimestamp(),
                    read: false,
                    portal: 'english'
                });
            }

            setToast({ message: 'Article published successfully!', type: 'success' });
            setSuccessMessage(true);
            setTitle('');
            setSubHeadline('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            setExistingImageUrl(null);
            setHashtags('');
            setIsLive(false);
            setSendPush(false);
            localStorage.removeItem('asre-hazir-draft');

            setTimeout(() => setSuccessMessage(false), 5000);

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error adding document: ', error);
            setToast({ message: 'Broadcast failed. Check connection.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const currentCat = categories.find(c => c.name === category);
    const currentSubCategories = currentCat?.subCategories || [];
    const SECTIONS = ['Top Stories', 'Breaking News', 'Must Watch', 'Latest News', 'Regional', 'Other'];

    if (catsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] gap-3 text-gray-400">
                <Loader size={20} className="animate-spin text-primary" />
                <span className="font-bold text-sm">Loading categories...</span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4">
            {/* Success Notification */}
            {successMessage && (
                <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right duration-500">
                    <div className="bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                        <CheckCircle2 size={24} />
                        <div>
                            <p className="font-black uppercase tracking-widest text-xs">Broadcast Success</p>
                            <p className="text-sm font-medium opacity-90">Your article is now live on the portal.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative">

                        {/* News Desk Header */}
                        <div className="bg-zinc-900 p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="text-primary" size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Newsroom Engine</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight uppercase italic leading-none">Broadcast Desk</h1>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={handleClearDraftClick}
                                        className="flex items-center gap-2 bg-zinc-800 text-zinc-500 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                                    >
                                        <Trash2 size={14} /> Reset Desk
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                            {/* Headline */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <Type className="w-3.5 h-3.5 text-primary" /> Article Headline
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-3xl md:text-5xl font-black border-b-2 border-gray-100 bg-transparent py-4 focus:border-primary outline-none transition-all"
                                    placeholder="Enter Headline..."
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
                                    className="w-full text-xl md:text-2xl font-bold border-b border-gray-100 bg-transparent py-2 focus:border-primary outline-none transition-all text-gray-600"
                                    placeholder="Enter sub-headline..."
                                />
                            </div>

                            {/* Hashtags & Live Toggle */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 p-8 rounded-3xl border border-gray-100">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Hash className="w-3.5 h-3.5 text-primary" /> Hashtags (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={hashtags}
                                        onChange={(e) => setHashtags(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                        placeholder="#politics, #hyderabad..."
                                    />
                                </div>
                                <div className="space-y-4 flex flex-col justify-center">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                        <Activity className="w-3.5 h-3.5 text-primary" /> Broadcasting Options
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 h-14">
                                            <span className="font-bold text-sm text-gray-600">Show as Live News</span>
                                            <div className="flex items-center gap-4">
                                                {categories.some(c => c.name === category) && (
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold">Eligible</span>
                                                )}
                                                <input
                                                    type="checkbox"
                                                    checked={isLive}
                                                    onChange={(e) => setIsLive(e.target.checked)}
                                                    className="w-6 h-6 accent-primary cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 h-14">
                                            <span className="font-bold text-sm text-gray-600 font-sans italic">Send Push Notification</span>
                                            <input
                                                type="checkbox"
                                                checked={sendPush}
                                                onChange={(e) => setSendPush(e.target.checked)}
                                                className="w-6 h-6 accent-primary cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Placement Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Section Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" /> Page Section
                                    </label>
                                    <select
                                        value={SECTIONS.includes(section) ? section : 'Other'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'Other') setSection('');
                                            else setSection(val);
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                    >
                                        {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {!SECTIONS.includes(section) && (
                                        <input
                                            type="text"
                                            placeholder="Enter Custom Section..."
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                            className="w-full p-3 mt-2 rounded-lg border border-primary/20 bg-white outline-none focus:border-primary transition-all font-bold text-xs"
                                        />
                                    )}
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-primary" /> News Category
                                    </label>
                                    <select
                                        value={categories.find(c => c.name === category) ? category : 'Other'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'Other') {
                                                setCategory('');
                                                setSubCategory('General');
                                            } else {
                                                handleCategoryChange(val);
                                            }
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                        <option value="Other">Other (Custom)...</option>
                                    </select>
                                    {(category === '' || !categories.find(c => c.name === category)) && (
                                        <input
                                            type="text"
                                            placeholder="Enter Custom Category..."
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-3 mt-2 rounded-lg border border-primary/20 bg-white outline-none focus:border-primary transition-all font-bold text-xs"
                                        />
                                    )}
                                </div>

                                {/* Subcategory Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Layout className="w-3.5 h-3.5 text-primary" /> Sub-category
                                    </label>
                                    {currentCat ? (
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                        >
                                            {currentSubCategories.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                            <option value="Other">Other (Custom)...</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder="Enter Sub-category..."
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Video URL (Conditional) */}
                            {category === 'Videos' && (
                                <div className="space-y-4 animate-in slide-in-from-top duration-500">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-primary" /> External Video Link (Twitter/YT/FB/Insta)
                                    </label>
                                    <input
                                        type="url"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        className="w-full p-6 rounded-[2rem] border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                                        placeholder="Paste video link here (e.g., https://twitter.com/... or https://youtube.com/...)"
                                        required={category === 'Videos'}
                                    />
                                </div>
                            )}

                            {/* Body */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <FileText className="w-3.5 h-3.5 text-primary" /> Story Body
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
                                        className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100"
                                        placeholder="Report the details here..."
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        type="button"
                                        onClick={fetchMediaLibrary}
                                        className="text-primary font-bold hover:underline flex items-center gap-2 text-sm"
                                    >
                                        <List size={16} /> Select from Media Library
                                    </button>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <ImageIcon className="w-3.5 h-3.5 text-primary" /> Media Asset
                                    </label>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${imagePreview || existingImageUrl ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'}`}>
                                    {imagePreview || existingImageUrl ? (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                            <img src={imagePreview || existingImageUrl || ''} alt="Preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => { setImage(null); setImagePreview(null); setExistingImageUrl(null); }} className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Change Image</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <ImageIcon className="w-12 h-12 text-gray-300 mb-4" />
                                            <span className="text-gray-900 font-bold">Select News Photo</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group bg-primary hover:bg-black text-white font-black py-8 rounded-[2rem] transition-all duration-500 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 active:scale-95"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="uppercase tracking-[0.4em] text-sm">Broadcasting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="uppercase tracking-[0.4em] text-lg">Send to Production</span>
                                        <Send size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Media Library Modal — Mobile First */}
            {isMediaLibraryOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex flex-col justify-end sm:justify-center sm:items-center sm:p-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setIsMediaLibraryOpen(false); }}
                >
                    <div
                        className="w-full sm:max-w-5xl flex flex-col"
                        style={{
                            background: '#fff',
                            borderRadius: window.innerWidth < 640 ? '1.5rem 1.5rem 0 0' : '2rem',
                            maxHeight: window.innerWidth < 640 ? '85vh' : '90vh',
                            height: window.innerWidth < 640 ? '85vh' : '90vh',
                            overflow: 'hidden',
                            boxShadow: '0 -10px 60px rgba(0,0,0,0.3)',
                        }}
                    >
                        {/* Drag handle (mobile) */}
                        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
                            <div style={{ width: 40, height: 4, borderRadius: 9999, background: '#d1d5db' }} />
                        </div>

                        {/* Header */}
                        <div
                            className="flex justify-between items-center shrink-0 px-5 py-4"
                            style={{ background: '#18181b', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: 2 }}>Admin Panel</p>
                                <h2 style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', margin: 0 }}>Media Library</h2>
                            </div>
                            <button
                                onClick={() => setIsMediaLibraryOpen(false)}
                                style={{
                                    background: '#3f3f46', border: 'none', color: '#fff',
                                    borderRadius: 12, padding: '8px 14px',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    fontSize: 11, fontWeight: 900, cursor: 'pointer',
                                    textTransform: 'uppercase', letterSpacing: '0.1em'
                                }}
                            >
                                <X size={15} /> Close
                            </button>
                        </div>

                        {/* Count bar */}
                        {mediaLibrary.length > 0 && (
                            <div className="px-4 py-2 shrink-0" style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                                    {mediaLibrary.length} images — tap to select
                                </p>
                            </div>
                        )}

                        {/* Scrollable Grid — 3 cols mobile / 5 cols desktop */}
                        <div
                            style={{
                                flex: 1,
                                minHeight: 0,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                WebkitOverflowScrolling: 'touch',
                                padding: 10,
                                display: 'grid',
                                gridTemplateColumns: window.innerWidth < 640
                                    ? 'repeat(3, 1fr)'
                                    : 'repeat(5, 1fr)',
                                gap: 8,
                                alignContent: 'start',
                            }}
                        >
                            {mediaLibrary.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: '#d1d5db' }}>
                                    <ImageIcon size={48} style={{ marginBottom: 12 }} />
                                    <p style={{ fontWeight: 700, color: '#9ca3af', fontSize: 14 }}>No images yet</p>
                                    <p style={{ fontSize: 11, color: '#d1d5db', marginTop: 4 }}>Upload an image with a news article first</p>
                                </div>
                            ) : mediaLibrary.map((url, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setExistingImageUrl(url);
                                        setImage(null);
                                        setImagePreview(null);
                                        setIsMediaLibraryOpen(false);
                                    }}
                                    style={{
                                        aspectRatio: '1/1',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        border: '2px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s, transform 0.1s',
                                        background: '#f3f4f6',
                                    }}
                                    onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                                    onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                >
                                    <img
                                        src={url}
                                        alt={`media-${i}`}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={confirmClearDraft}
                title="Reset Content"
                message="Are you sure you want to clear all fields? This will delete your current draft and cannot be undone."
                confirmText="Reset Everything"
                isLoading={false}
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

export default AddNews;
