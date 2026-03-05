import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

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
        <div className="bg-primary text-white overflow-hidden py-3 border-y border-primary shadow-lg relative z-50 w-full">
            <div className="flex whitespace-nowrap animate-ticker">
                {/* Render triple for absolute seamlessness */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {displayPosts.map((post) => (
                            <span key={`${i}-${post.id}`} className="inline-flex items-center mx-12">
                                <span className="bg-white text-primary text-[10px] font-black px-2 py-0.5 rounded mr-4 shadow-sm uppercase">Latest</span>
                                <span className="text-sm md:text-base font-bold tracking-tight">{post.title}</span>
                                <span className="mx-12 text-white/30 font-light">/</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
