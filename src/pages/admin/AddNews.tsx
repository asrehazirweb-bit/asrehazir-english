import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';
import { Image as ImageIcon, Send, Layout, Type, FileText, Tag, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

const CATEGORIES = [
    { name: 'World News', subCategories: ['Top Stories', 'Middle East', 'International', 'Diplomacy'] },
    { name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States'] },
    { name: 'Deccan News', subCategories: ['Hyderabad', 'Telangana', 'Andhra Pradesh', 'South India'] },
    { name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'] },
    { name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'] },
    { name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'] },
    { name: 'Photos', subCategories: ['Top Stories', 'Politics', 'Sports', 'Entertainment', 'Events'] },
    { name: 'Videos', subCategories: ['News', 'Events', 'Interviews', 'Viral'] }
];

const FONTS_TITLE = [
    { id: 'font-playfair', name: 'Playfair Display (Newsroom)' },
    { id: 'font-lora', name: 'Lora (Elegant)' },
    { id: 'font-oswald', name: 'Oswald (Bold)' },
    { id: 'font-montserrat', name: 'Montserrat (Modern)' },
    { id: 'font-merriweather', name: 'Merriweather (Classic)' },
    { id: 'font-ubuntu', name: 'Ubuntu (Soft)' },
    { id: 'font-raleway', name: 'Raleway (Stylish)' },
    { id: 'font-roboto-slab', name: 'Roboto Slab (Traditional)' },
    { id: 'font-inter', name: 'Inter (Standard)' },
    { id: 'font-georgia', name: 'Georgia (Serif)' }
];

const FONTS_CONTENT = [
    { id: 'font-merriweather', name: 'Merriweather (Clear)' },
    { id: 'font-lora', name: 'Lora (Classic)' },
    { id: 'font-inter', name: 'Inter (Sharp)' },
    { id: 'font-roboto-slab', name: 'Roboto Slab (Soft)' },
    { id: 'font-montserrat', name: 'Montserrat (Modern)' },
    { id: 'font-playfair', name: 'Playfair Display' },
    { id: 'font-ubuntu', name: 'Ubuntu' },
    { id: 'font-raleway', name: 'Raleway' },
    { id: 'font-georgia', name: 'Georgia' },
    { id: 'font-sans', name: 'Default Sans' }
];

const AddNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [section, setSection] = useState('Top Stories');
    const [category, setCategory] = useState('World News');
    const [subCategory, setSubCategory] = useState('Top Stories');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [titleFont, setTitleFont] = useState('font-playfair');
    const [contentFont, setContentFont] = useState('font-merriweather');
    const [videoUrl, setVideoUrl] = useState('');

    // New state for modal and toast
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-draft');
        if (draft) {
            const { title: dTitle, content: dContent, category: dCategory, subCategory: dSubCategory, section: dSection, titleFont: dTitleFont, contentFont: dContentFont } = JSON.parse(draft);
            setTitle(dTitle || '');
            setContent(dContent || '');
            setCategory(dCategory || 'World News');
            setSubCategory(dSubCategory || 'Top Stories');
            setSection(dSection || 'Top Stories');
            setTitleFont(dTitleFont || 'font-playfair');
            setContentFont(dContentFont || 'font-merriweather');
            setVideoUrl(JSON.parse(draft).videoUrl || '');
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-draft', JSON.stringify({ title, content, category, subCategory, section, titleFont, contentFont, videoUrl }));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, content, category, subCategory, section, titleFont, contentFont, videoUrl]);

    const handleClearDraftClick = () => {
        setIsClearModalOpen(true);
    };

    const confirmClearDraft = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setSection('Top Stories');
        setCategory('World News');
        setSubCategory('Top Stories');
        setVideoUrl('');
        localStorage.removeItem('asre-hazir-draft');
        setIsClearModalOpen(false);
        setToast({ message: 'Draft cleared successfully', type: 'success' });
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = CATEGORIES.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0]);
        } else if (val !== 'Other') {
            setSubCategory('General');
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
            // Validate image is required
            if (!image) {
                setToast({ message: 'Please upload an image', type: 'error' });
                setLoading(false);
                return;
            }

            // Upload image
            let imageUrl = '';
            try {
                imageUrl = await uploadImage(image, 'english');
                console.log('✅ Image uploaded:', imageUrl);
            } catch (imgErr: any) {
                console.error("Image upload error:", imgErr);
                setToast({ message: `Image upload failed: ${imgErr.message || 'Unknown error'}`, type: 'error' });
                setLoading(false);
                return;
            }

            // Save to Firestore - IMAGE ONLY
            await addDoc(collection(db, 'news'), {
                title,
                content,
                section,
                category,
                subCategory,
                titleFont,
                contentFont,
                videoUrl,
                imageUrl: imageUrl,  // Single image field
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'Asre Hazir Desk',
                authorId: auth.currentUser?.uid,
                status: 'published'
            });

            console.log('✅ News article published successfully');
            setToast({ message: 'Article published successfully!', type: 'success' });

            setSuccessMessage(true);
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
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

    const currentSubCategories = CATEGORIES.find(c => c.name === category)?.subCategories || [];
    const SECTIONS = ['Top Stories', 'Breaking News', 'Must Watch', 'Latest News', 'Regional', 'Other'];

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
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative">

                        {/* News Desk Header */}
                        <div className="bg-zinc-900 p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="text-red-600" size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Newsroom Engine</span>
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
                                    <Type className="w-3.5 h-3.5 text-red-600" /> Article Headline
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full text-3xl md:text-5xl font-black border-b-2 border-gray-100 dark:border-zinc-800 bg-transparent py-4 focus:border-red-600 outline-none transition-all dark:text-white ${titleFont}`}
                                    placeholder="Enter Headline..."
                                    required
                                />
                            </div>

                            {/* Font Strategy Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 dark:bg-zinc-800/30 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Sparkles className="w-3.5 h-3.5 text-red-600" /> Headline Font
                                    </label>
                                    <select
                                        value={titleFont}
                                        onChange={(e) => setTitleFont(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {FONTS_TITLE.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <FileText className="w-3.5 h-3.5 text-red-600" /> story Content Font
                                    </label>
                                    <select
                                        value={contentFont}
                                        onChange={(e) => setContentFont(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {FONTS_CONTENT.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Placement Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Section Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Sparkles className="w-3.5 h-3.5 text-red-600" /> Page Section
                                    </label>
                                    <select
                                        value={SECTIONS.includes(section) ? section : 'Other'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'Other') setSection('');
                                            else setSection(val);
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {!SECTIONS.includes(section) && (
                                        <input
                                            type="text"
                                            placeholder="Enter Custom Section..."
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                            className="w-full p-3 mt-2 rounded-lg border border-red-600/20 bg-white dark:bg-zinc-800 outline-none focus:border-red-600 transition-all dark:text-white font-bold text-xs"
                                        />
                                    )}
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-red-600" /> News Category
                                    </label>
                                    <select
                                        value={CATEGORIES.find(c => c.name === category) ? category : 'Other'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'Other') {
                                                setCategory('');
                                                setSubCategory('General');
                                            } else {
                                                handleCategoryChange(val);
                                            }
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                        <option value="Other">Other (Custom)...</option>
                                    </select>
                                    {(category === '' || !CATEGORIES.find(c => c.name === category)) && (
                                        <input
                                            type="text"
                                            placeholder="Enter Custom Category..."
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-3 mt-2 rounded-lg border border-red-600/20 bg-white dark:bg-zinc-800 outline-none focus:border-red-600 transition-all dark:text-white font-bold text-xs"
                                        />
                                    )}
                                </div>

                                {/* Subcategory Selection */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Layout className="w-3.5 h-3.5 text-red-600" /> Sub-category
                                    </label>
                                    {CATEGORIES.find(c => c.name === category) ? (
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
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
                                            className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Video URL (Conditional) */}
                            {category === 'Videos' && (
                                <div className="space-y-4 animate-in slide-in-from-top duration-500">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-red-600" /> External Video Link (Twitter/YT/FB/Insta)
                                    </label>
                                    <input
                                        type="url"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        className="w-full p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold"
                                        placeholder="Paste video link here (e.g., https://twitter.com/... or https://youtube.com/...)"
                                        required={category === 'Videos'}
                                    />
                                </div>
                            )}

                            {/* Body */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <FileText className="w-3.5 h-3.5 text-red-600" /> Story Body
                                </label>
                                <div className={`quill-wrapper ${contentFont}`}>
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
                                        className="bg-gray-50 dark:bg-zinc-800/50 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800"
                                        placeholder="Report the details here..."
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <ImageIcon className="w-3.5 h-3.5 text-red-600" /> Media Asset
                                </label>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${imagePreview ? 'border-red-600 bg-red-50/5' : 'border-gray-200 dark:border-zinc-800 hover:border-red-600'}`}>
                                    {imagePreview ? (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Change Image</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <ImageIcon className="w-12 h-12 text-gray-300 mb-4" />
                                            <span className="text-gray-900 dark:text-white font-bold">Select News Photo</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group bg-red-600 hover:bg-black text-white font-black py-8 rounded-[2rem] transition-all duration-500 shadow-2xl shadow-red-600/30 flex items-center justify-center gap-4 active:scale-95"
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
