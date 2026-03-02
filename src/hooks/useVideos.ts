import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';


export interface VideoArticle {
    id: string;
    title: string;
    subHeadline?: string;
    content?: string;
    category: string;
    imageUrl: string;
    videoUrl?: string;
    createdAt: any;
    author: string;
    duration?: string;
}

export const useVideos = (maxItems: number = 20) => {
    const [videos, setVideos] = useState<VideoArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const newsRef = collection(db, 'news');

        // Query for videos - assuming they have a videoUrl or a specific category/type
        // If there's no 'type' field, we'll fetch all and filter or use category 'Videos'
        const q = query(
            newsRef,
            orderBy('createdAt', 'desc'),
            limit(100) // Fetch more to filter
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedVideos = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as any))
                .filter(item => (item.videoUrl && item.videoUrl !== '') || item.category === 'Videos' || item.category === 'ویڈیوز')
                .slice(0, maxItems)
                .map(item => ({
                    id: item.id,
                    title: item.title,
                    subHeadline: item.subHeadline,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    videoUrl: item.videoUrl,
                    createdAt: item.createdAt,
                    author: item.author,
                    duration: item.duration || "00:00"
                } as VideoArticle));

            setVideos(fetchedVideos);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching videos:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [maxItems]);

    return { videos, loading, error };
};
