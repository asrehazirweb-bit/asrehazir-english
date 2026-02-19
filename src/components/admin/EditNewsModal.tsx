import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { X, Save, Image as ImageIcon, Layout, Type, FileText, Tag, Loader2 } from 'lucide-react';
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
    { name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States'] },
    { name: 'Deccan News', subCategories: ['Hyderabad', 'Telangana', 'Andhra Pradesh', 'South India'] },
    { name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'] },
    { name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'] },
    { name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'] }
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

const EditNewsModal: React.FC<EditNewsModalProps> = ({ article, onClose, onSuccess }) => {
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);
    const [category, setCategory] = useState(article.category);
    const [subCategory, setSubCategory] = useState(article.subCategory || 'Top Stories');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(article.imageUrl);
    const [loading, setLoading] = useState(false);
    const [titleFont, setTitleFont] = useState(article.titleFont || 'font-playfair');
    const [contentFont, setContentFont] = useState(article.contentFont || 'font-merriweather');

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
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = article.imageUrl;

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

            const docRef = doc(db, 'news', article.id);
            await updateDoc(docRef, {
                title,
                content,
                category,
                subCategory,
                titleFont,
                contentFont,
                imageUrl,
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
                            className={`w-full text-2xl md:text-3xl font-black border-b-2 border-gray-100 bg-transparent py-4 focus:border-primary outline-none transition-all ${titleFont}`}
                            required
                        />
                    </div>

                    {/* Font Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 rounded-3xl border border-gray-100">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Save size={14} className="text-primary" /> Title Font
                            </label>
                            <select
                                value={titleFont}
                                onChange={(e) => setTitleFont(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none text-xs font-bold"
                            >
                                {FONTS_TITLE.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <FileText size={14} className="text-primary" /> Content Font
                            </label>
                            <select
                                value={contentFont}
                                onChange={(e) => setContentFont(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none text-xs font-bold"
                            >
                                {FONTS_CONTENT.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Meta Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Tag className="w-3.5 h-3.5 text-primary" /> Section
                            </label>
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-bold text-sm"
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
                                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-bold text-sm"
                            >
                                {currentSubCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <FileText className="w-3.5 h-3.5 text-primary" /> Narrative Content
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
                                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
                                placeholder="Edit narrative content..."
                            />
                        </div>
                    </div>

                    {/* Image Update */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <ImageIcon className="w-3.5 h-3.5 text-primary" /> Media Update
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {imagePreview && (
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                    <img src={imagePreview} alt="Current" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Current Image</span>
                                    </div>
                                </div>
                            )}
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-primary transition-all aspect-video group">
                                <ImageIcon size={24} className="text-gray-300 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-gray-400">Change Media</span>
                                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>
                </form>

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
