import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import {
    collection, doc, setDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { Plus, Trash2, FolderOpen, Tag, ChevronRight, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import Toast from '../../components/ui/Toast';

interface Category {
    id: string;
    name: string;
    subCategories: string[];
    order: number;
}

const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
    { name: 'World News', subCategories: ['Top Stories', 'Middle East', 'International', 'Diplomacy'], order: 1 },
    { name: 'National News', subCategories: ['Top Stories', 'Politics', 'Governance', 'States'], order: 2 },
    { name: 'Hyderabad', subCategories: ['Local News', 'Crime', 'Politics', 'Business', 'Events'], order: 3 },
    { name: 'Telangana', subCategories: ['Local News', 'Politics', 'Development', 'Agriculture'], order: 4 },
    { name: 'Andhra Pradesh', subCategories: ['Local News', 'Politics', 'Development', 'Business'], order: 5 },
    { name: 'Photos', subCategories: ['Top Stories', 'Politics', 'Sports', 'Entertainment', 'Events'], order: 6 },
    { name: 'Videos', subCategories: ['News', 'Events', 'Interviews', 'Viral'], order: 7 },
    { name: 'Articles & Essays', subCategories: ['Editorial', 'Analysis', 'Opinion', 'Special Reports'], order: 8 },
    { name: 'Sports & Entertainment', subCategories: ['Cricket', 'Cinema', 'OTT', 'Lifestyle'], order: 9 },
    { name: 'Crime & Accidents', subCategories: ['Local Crime', 'Investigation', 'Security', 'Accidents'], order: 10 },
];


const ManageCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    // New category form
    const [newCatName, setNewCatName] = useState('');
    const [newSubInput, setNewSubInput] = useState('');
    const [newSubList, setNewSubList] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    // Add sub to existing category
    const [addingSubFor, setAddingSubFor] = useState<string | null>(null);
    const [subInputFor, setSubInputFor] = useState('');

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const COLLECTION = 'categories_english';

    // Real-time listener
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, COLLECTION),
            (snap) => {
                const cats = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Category[];
                cats.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCategories(cats);
                setLoading(false);
            },
            (error) => {
                // On Firestore error (permissions, network), stop loading so UI unlocks
                console.error('Categories listener error:', error);
                setLoading(false);
                setToast({ message: 'Could not load categories. Check Firestore rules.', type: 'error' });
            }
        );
        return () => unsub();
    }, []);

    const seedDefaults = async () => {
        setSeeding(true);
        try {
            for (const cat of DEFAULT_CATEGORIES) {
                const id = cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                await setDoc(doc(db, COLLECTION, id), cat);
            }
            setToast({ message: 'Default categories seeded successfully!', type: 'success' });
        } catch (e) {
            setToast({ message: 'Failed to seed categories.', type: 'error' });
        } finally {
            setSeeding(false);
        }
    };

    const handleAddSub = () => {
        const val = newSubInput.trim();
        if (val && !newSubList.includes(val)) {
            setNewSubList([...newSubList, val]);
            setNewSubInput('');
        }
    };

    const handleCreateCategory = async () => {
        if (!newCatName.trim()) return;
        setSaving(true);
        try {
            const id = newCatName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
            await setDoc(doc(db, COLLECTION, id), {
                name: newCatName.trim(),
                subCategories: newSubList,
                order: categories.length + 1,
            });
            setNewCatName('');
            setNewSubList([]);
            setNewSubInput('');
            setToast({ message: `Category "${newCatName}" created!`, type: 'success' });
        } catch {
            setToast({ message: 'Failed to create category.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCategory = async (id: string, name: string) => {
        try {
            await deleteDoc(doc(db, COLLECTION, id));
            setToast({ message: `"${name}" deleted.`, type: 'success' });
        } catch {
            setToast({ message: 'Failed to delete category.', type: 'error' });
        }
    };

    const handleAddSubToExisting = async (cat: Category) => {
        const val = subInputFor.trim();
        if (!val || cat.subCategories.includes(val)) return;
        try {
            await setDoc(doc(db, COLLECTION, cat.id), {
                ...cat,
                subCategories: [...cat.subCategories, val],
            });
            setSubInputFor('');
            setAddingSubFor(null);
            setToast({ message: `Sub-category "${val}" added to ${cat.name}!`, type: 'success' });
        } catch {
            setToast({ message: 'Failed to add sub-category.', type: 'error' });
        }
    };

    const handleDeleteSub = async (cat: Category, sub: string) => {
        try {
            await setDoc(doc(db, COLLECTION, cat.id), {
                ...cat,
                subCategories: cat.subCategories.filter(s => s !== sub),
            });
            setToast({ message: `Sub-category "${sub}" removed.`, type: 'success' });
        } catch {
            setToast({ message: 'Failed to remove sub-category.', type: 'error' });
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-10">

            {/* Header */}
            <div className="bg-zinc-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FolderOpen className="text-primary" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Category Manager</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black font-serif tracking-tight uppercase italic">
                            Manage Categories
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Add, remove, and organise news categories shown in the admin and frontend.</p>
                    </div>
                    {/* Always show button — don't wait for loading */}
                    <button
                        onClick={seedDefaults}
                        disabled={seeding}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all whitespace-nowrap disabled:opacity-60"
                    >
                        {seeding ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Seeding...</>
                        ) : (
                            '⚡ Load Default Categories'
                        )}
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-20 text-gray-400 font-bold">Loading categories...</div>
            )}

            {/* Empty State */}
            {!loading && categories.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                    <AlertTriangle size={40} className="mx-auto text-yellow-400 mb-4" />
                    <h3 className="text-xl font-black text-gray-700 mb-2">No Categories Yet</h3>
                    <p className="text-sm text-gray-400 mb-6">Click the button below to load default categories instantly.</p>
                    <button
                        onClick={seedDefaults}
                        disabled={seeding}
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-60"
                    >
                        {seeding ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading...</>
                        ) : (
                            '⚡ Load Default Categories'
                        )}
                    </button>
                </div>
            )}

            {/* Existing Categories */}
            {!loading && categories.length > 0 && (
                <div className="space-y-5">
                    <h2 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 px-1">
                        All Categories ({categories.length})
                    </h2>
                    {categories.map(cat => (
                        <div key={cat.id} className="bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Category Header */}
                            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Tag size={16} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 text-base">{cat.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            {cat.subCategories.length} sub-categories
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                    className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                    title="Delete category"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Sub-categories */}
                            <div className="px-7 py-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {cat.subCategories.map(sub => (
                                        <span
                                            key={sub}
                                            className="group flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold hover:border-red-200 hover:bg-red-50 transition-all"
                                        >
                                            <ChevronRight size={11} className="text-primary" />
                                            {sub}
                                            <button
                                                onClick={() => handleDeleteSub(cat, sub)}
                                                className="ml-1 text-gray-300 group-hover:text-red-400 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {/* Add sub-category inline */}
                                {addingSubFor === cat.id ? (
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={subInputFor}
                                            onChange={e => setSubInputFor(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddSubToExisting(cat)}
                                            placeholder="New sub-category..."
                                            autoFocus
                                            className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold"
                                        />
                                        <button
                                            onClick={() => handleAddSubToExisting(cat)}
                                            className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-primary/90 transition-all"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => { setAddingSubFor(null); setSubInputFor(''); }}
                                            className="px-3 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-xs font-black hover:bg-gray-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setAddingSubFor(cat.id); setSubInputFor(''); }}
                                        className="flex items-center gap-1.5 text-xs text-primary font-black hover:underline mt-1"
                                    >
                                        <Plus size={13} /> Add Sub-Category
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create New Category Card */}
            <div className="bg-white border-2 border-dashed border-primary/30 rounded-[2rem] p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                        <Plus size={18} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-base font-black text-gray-900">Create New Category</h2>
                        <p className="text-[11px] text-gray-400 font-bold">Add a custom category with sub-categories</p>
                    </div>
                </div>

                {/* Category Name */}
                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">
                        Category Name *
                    </label>
                    <input
                        type="text"
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm"
                        placeholder="e.g. Business & Economy"
                    />
                </div>

                {/* Sub-categories builder */}
                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">
                        Sub-Categories (press Enter or click Add)
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newSubInput}
                            onChange={e => setNewSubInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSub())}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm"
                            placeholder="e.g. Market News"
                        />
                        <button
                            type="button"
                            onClick={handleAddSub}
                            className="px-5 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-primary transition-all"
                        >
                            Add
                        </button>
                    </div>
                    {newSubList.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {newSubList.map(s => (
                                <span key={s} className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
                                    {s}
                                    <button onClick={() => setNewSubList(newSubList.filter(x => x !== s))}>
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleCreateCategory}
                    disabled={!newCatName.trim() || saving}
                    className="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <CheckCircle2 size={18} />
                            Create Category
                        </>
                    )}
                </button>
            </div>

            {/* Toast */}
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default ManageCategories;
