import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Image as ImageIcon, Send, Layout, Type, FileText, Tag, Eye, EyeOff, Save, Trash2, Sparkles } from 'lucide-react';

const CATEGORIES = [
    { name: 'World News', subCategories: ['Top Stories', 'Middle East', 'International', 'Diplomacy'] },
    { name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States'] },
    { name: 'Deccan News', subCategories: ['Hyderabad', 'Telangana', 'Andhra Pradesh', 'South India'] },
    { name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'] },
    { name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'] },
    { name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'] }
];

const AddNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('World News');
    const [subCategory, setSubCategory] = useState('Top Stories');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-draft');
        if (draft) {
            const { title: dTitle, content: dContent, category: dCategory, subCategory: dSubCategory } = JSON.parse(draft);
            setTitle(dTitle || '');
            setContent(dContent || '');
            setCategory(dCategory || 'India');
            setSubCategory(dSubCategory || 'Top Stories');
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-draft', JSON.stringify({ title, content, category, subCategory }));
                setLastSaved(new Date().toLocaleTimeString());
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, content, category, subCategory]);

    const handleClearDraft = () => {
        if (window.confirm('Clear all fields? This will delete your current draft.')) {
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            localStorage.removeItem('asre-hazir-draft');
            setLastSaved(null);
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
            let imageUrl = '';
            if (image) {
                try {
                    const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
                    await uploadBytes(storageRef, image);
                    imageUrl = await getDownloadURL(storageRef);
                } catch (storageErr) {
                    console.error("Storage error:", storageErr);
                    alert("Note: Image upload failed. Posting without image.");
                }
            }

            await addDoc(collection(db, 'news'), {
                title,
                content,
                category,
                subCategory,
                imageUrl: imageUrl || 'https://via.placeholder.com/800x400?text=Asre+Hazir+News',
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'Asre Hazir Desk',
                authorId: auth.currentUser?.uid,
                status: 'published'
            });

            alert('Broadcast Successful! Article is now live.');
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            localStorage.removeItem('asre-hazir-draft');
            setLastSaved(null);

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Broadcast failed. Please check connection.');
        } finally {
            setLoading(false);
        }
    };

    const currentSubCategories = CATEGORIES.find(c => c.name === category)?.subCategories || [];

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Desk Form */}
                <div className="lg:col-span-12">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden">

                        {/* News Desk Header */}
                        <div className="bg-zinc-900 p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="text-red-600" size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Broadcast Engine</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight uppercase italic leading-none">News Desk</h1>
                                    <p className="text-zinc-500 font-sans text-sm mt-2 max-w-lg">Drafting stories that matter. Your content reaches the portal audience the moment you hit broadcast.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPreview(!showPreview)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${showPreview ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                    >
                                        {showPreview ? <><EyeOff size={14} /> Close Preview</> : <><Eye size={14} /> Open Preview</>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearDraft}
                                        className="flex items-center gap-2 bg-zinc-800 text-zinc-500 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                                    >
                                        <Trash2 size={14} /> Reset Desk
                                    </button>
                                </div>
                            </div>

                            {lastSaved && (
                                <div className="absolute bottom-6 right-10 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-600">
                                    <Save size={10} /> Auto-saved at {lastSaved}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-12">

                            {/* 1. BROADCAST HEADLINES */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <Type className="w-3.5 h-3.5 text-red-600" /> Broadcast Headline
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-3xl md:text-4xl lg:text-5xl font-serif font-black border-b-2 border-gray-100 dark:border-zinc-800 bg-transparent py-4 focus:border-red-600 outline-none transition-all dark:text-white placeholder:opacity-20"
                                    placeholder="Enter Headline..."
                                    required
                                />
                            </div>

                            {/* 2. CATEGORY ARCHITECTURE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-red-600" /> Primary Section
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white appearance-none cursor-pointer font-bold text-sm"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name} Region</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Layout className="w-3.5 h-3.5 text-red-600" /> Subsection Flow
                                    </label>
                                    <select
                                        value={subCategory}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                        className="w-full p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white appearance-none cursor-pointer font-bold text-sm"
                                    >
                                        {currentSubCategories.map(sub => (
                                            <option key={sub} value={sub}>{sub} Stream</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* 3. EDITORIAL CONTENT */}
                            <div className="space-y-4 relative">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <FileText className="w-3.5 h-3.5 text-red-600" /> Editorial Body
                                    </label>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{content.length} Characters Written</span>
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={12}
                                    className="w-full p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white font-sans leading-relaxed text-xl placeholder:opacity-20"
                                    placeholder="Report the story with precision. Maintain journalistic integrity..."
                                    required
                                />
                            </div>

                            {/* 4. MEDIA ASSETS */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <ImageIcon className="w-3.5 h-3.5 text-red-600" /> Broadcast Media <span className="text-[8px] text-gray-300 lowercase italic ml-1">(Landscape Optimal)</span>
                                </label>

                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${imagePreview ? 'border-red-600 bg-red-50/5' : 'border-gray-200 dark:border-zinc-800 hover:border-red-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50'}`}>
                                    {imagePreview ? (
                                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setImage(null); setImagePreview(null); }}
                                                className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[8px] hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                Change Media
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 transition-transform">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                            <span className="text-base text-gray-900 dark:text-white font-bold">Select Broadcast Image</span>
                                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-[0.2em] font-black">Drag assets here or Browse files</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* PREVIEW PANEL (CONDITIONAL) */}
                            {showPreview && (
                                <div className="mt-12 p-10 bg-gray-50 dark:bg-zinc-800/20 rounded-[3rem] border-2 border-red-600/10 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Eye className="text-red-600" size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Site Preview</span>
                                    </div>
                                    <div className="max-w-4xl mx-auto space-y-6">
                                        <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white leading-tight">{title || 'Headline will appear here'}</h2>
                                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <span>By {auth.currentUser?.displayName || 'Asre Hazir Desk'}</span>
                                            <span>•</span>
                                            <span>Just Now</span>
                                            <span className="bg-red-600 text-white px-2 py-0.5 rounded ml-auto">{category}</span>
                                        </div>
                                        {imagePreview && <img src={imagePreview} className="w-full aspect-video object-cover rounded-3xl shadow-xl" />}
                                        <div className="prose prose-lg dark:prose-invert">
                                            {content ? content.split('\n').map((p, i) => <p key={i} className="text-gray-700 dark:text-zinc-400 font-sans leading-relaxed text-lg">{p}</p>) : <p className="text-gray-300 italic">Article content will render here...</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BROADCAST BUTTON */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full group relative bg-red-600 hover:bg-black text-white font-black py-8 px-12 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-red-600/20 active:scale-[0.98] overflow-hidden"
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-4">
                                        {loading ? (
                                            <div className="flex items-center gap-4">
                                                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                <span className="uppercase tracking-[0.3em] text-sm">Synchronizing Broadcast...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="uppercase tracking-[0.3em] text-lg">Broadcast Article Live</span>
                                                <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </button>
                                <p className="text-center mt-6 text-[10px] font-black uppercase tracking-widest text-gray-300 italic">Caution: This action will push content to the live production server.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNews;
