
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

interface NewsItem {
    id: string;
    title: string;
}

export const NewsTicker: React.FC = () => {
    const [posts, setPosts] = useState<NewsItem[]>([]);

    useEffect(() => {
        const q = query(
            collection(db, 'news'),
            orderBy('createdAt', 'desc'),
            limit(10)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
            } as NewsItem));
            setPosts(fetchedPosts);
        });

        return () => unsubscribe();
    }, []);

    const displayPosts = posts.length > 0 ? posts : [
        { id: '1', title: 'Welcome to Asre Hazir English Portal' },
        { id: '2', title: 'Check back for the latest news and updates' }
    ];

    return (
        <div className="w-full bg-white border-b border-gray-100 overflow-hidden flex items-stretch h-10 relative z-50">
            {/* BREAKING Label */}
            <div className="flex-shrink-0 bg-primary text-white px-4 flex items-center gap-2 z-10 shadow-lg">
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    Breaking
                </span>
            </div>

            {/* Scrolling Track Container */}
            <div className="flex-1 overflow-hidden relative flex items-center">
                <div className="flex items-center whitespace-nowrap animate-ticker gap-10">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0 gap-10">
                            {displayPosts.map((post) => (
                                <Link
                                    key={`${i}-${post.id}`}
                                    to={`/news/${post.id}`}
                                    className="text-[13px] font-bold text-gray-800 hover:text-primary transition-colors whitespace-nowrap shrink-0"
                                >
                                    {post.title}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
