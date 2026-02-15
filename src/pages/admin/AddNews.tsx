import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage, uploadVideo } from '../../lib/cloudinary';
import { Image as ImageIcon, Video as VideoIcon, Send, Layout, Type, FileText, Tag, Eye, EyeOff, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

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
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // New state for modal and toast
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-draft');
        if (draft) {
            const { title: dTitle, content: dContent, category: dCategory, subCategory: dSubCategory } = JSON.parse(draft);
            setTitle(dTitle || '');
            setContent(dContent || '');
            setCategory(dCategory || 'World News');
            setSubCategory(dSubCategory || 'Top Stories');
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-draft', JSON.stringify({ title, content, category, subCategory }));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, content, category, subCategory]);

    const handleClearDraftClick = () => {
        setIsClearModalOpen(true);
    };

    const confirmClearDraft = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setVideo(null);
        setVideoPreview(null);
        localStorage.removeItem('asre-hazir-draft');
        setIsClearModalOpen(false);
        setToast({ message: 'Draft cleared successfully', type: 'success' });
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

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setVideo(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoPreview(url);
        } else {
            setVideoPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';
            if (image) {
                try {
                    imageUrl = await uploadImage(image, 'english');
                } catch (imgErr: any) {
                    console.error("Image upload error:", imgErr);
                    setToast({ message: `Image upload failed: ${imgErr.message || 'Unknown error'}`, type: 'error' });
                }
            }

            let videoUrl = '';
            if (video) {
                try {
                    videoUrl = await uploadVideo(video, 'english');
                } catch (vidErr: any) {
                    console.error("Video upload error:", vidErr);
                    setToast({ message: `Video upload failed: ${vidErr.message || 'Unknown error'}`, type: 'error' });
                }
            }

            await addDoc(collection(db, 'news'), {
                title,
                content,
                category,
                subCategory,
                imageUrl: imageUrl || 'https://via.placeholder.com/800x400?text=Asre+Hazir+News',
                videoUrl: videoUrl || null,
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'Asre Hazir Desk',
                authorId: auth.currentUser?.uid,
                status: 'published'
            });

            setSuccessMessage(true);
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            setVideo(null);
            setVideoPreview(null);
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
                                        onClick={() => setShowPreview(!showPreview)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${showPreview ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                    >
                                        {showPreview ? <><EyeOff size={14} /> Close Preview</> : <><Eye size={14} /> Open Preview</>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearDraftClick}
                                        className="flex items-center gap-2 bg-zinc-800 text-zinc-500 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                                    >
                                        <Trash2 size={14} /> Reset
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
                                    className="w-full text-3xl md:text-5xl font-serif font-black border-b-2 border-gray-100 dark:border-zinc-800 bg-transparent py-4 focus:border-red-600 outline-none transition-all dark:text-white"
                                    placeholder="Enter Headline..."
                                    required
                                />
                            </div>

                            {/* Categorization */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Tag className="w-3.5 h-3.5 text-red-600" /> Primary Section
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-sm h-16"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Layout className="w-3.5 h-3.5 text-red-600" /> Subsection
                                    </label>
                                    <select
                                        value={subCategory}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                        className="w-full p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-sm h-16"
                                    >
                                        {currentSubCategories.map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <FileText className="w-3.5 h-3.5 text-red-600" /> Story Body
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={10}
                                    className="w-full p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-sans leading-relaxed text-xl"
                                    placeholder="Report the details here..."
                                    required
                                />
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

                            {/* Video Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <VideoIcon className="w-3.5 h-3.5 text-red-600" /> Video Asset
                                </label>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${videoPreview ? 'border-red-600 bg-red-50/5' : 'border-gray-200 dark:border-zinc-800 hover:border-red-600'}`}>
                                    {videoPreview ? (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                                            <video src={videoPreview} controls className="w-full h-full object-contain" />
                                            <button type="button" onClick={() => { setVideo(null); setVideoPreview(null); }} className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase z-10">Change Video</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <VideoIcon className="w-12 h-12 text-gray-300 mb-4" />
                                            <span className="text-gray-900 dark:text-white font-bold">Select News Video</span>
                                            <input type="file" onChange={handleVideoChange} className="hidden" accept="video/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Preview Section */}
                            {showPreview && (
                                <div className="mt-12 p-8 md:p-12 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-red-600/10">
                                    <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 dark:text-white leading-tight mb-8 underline decoration-red-600 decoration-4">{title || 'Headline'}</h2>
                                    {imagePreview && <img src={imagePreview} className="w-full aspect-video object-cover rounded-3xl shadow-xl mb-8" />}
                                    {videoPreview && (
                                        <div className="mb-8 rounded-3xl overflow-hidden shadow-xl bg-black">
                                            <video src={videoPreview} controls className="w-full max-h-[500px] object-contain" />
                                        </div>
                                    )}
                                    <div className="prose prose-xl dark:prose-invert">
                                        {content.split('\n').map((p, i) => <p key={i} className="text-gray-700 dark:text-zinc-400 text-lg leading-relaxed">{p}</p>)}
                                    </div>
                                </div>
                            )}

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
