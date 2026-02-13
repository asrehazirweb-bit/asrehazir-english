import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

export interface NewsArticle {
    id: string;
    title: string;
    content: string;
    category: string;
    subCategory?: string;
    imageUrl: string;
    createdAt: any;
    author: string;
    authorId: string;
}

export const useNews = (category?: string, maxItems: number = 20, subCategory?: string) => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatTime = (createdAt: any) => {
        if (!createdAt) return 'Just now';

        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    useEffect(() => {
        setLoading(true);

        let q;
        const newsRef = collection(db, 'news');

        try {
            if (category && category !== 'All') {
                if (subCategory) {
                    q = query(
                        newsRef,
                        where('category', '==', category),
                        where('subCategory', '==', subCategory),
                        orderBy('createdAt', 'desc'),
                        limit(maxItems)
                    );
                } else {
                    q = query(
                        newsRef,
                        where('category', '==', category),
                        orderBy('createdAt', 'desc'),
                        limit(maxItems)
                    );
                }
            } else {
                q = query(
                    newsRef,
                    orderBy('createdAt', 'desc'),
                    limit(maxItems)
                );
            }

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedNews = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as NewsArticle[];

                setNews(fetchedNews);
                setLoading(false);
            }, (err) => {
                console.error("Error fetching news:", err);
                setError(err.message);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err: any) {
            console.error("Query setup error:", err);
            setError(err.message);
            setLoading(false);
        }
    }, [category, maxItems]);

    return { news, loading, error, formatTime };
};
