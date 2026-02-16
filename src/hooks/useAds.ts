import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Ad {
    id: string;
    imageUrl: string;
    link: string;
    placement: string;
    active: boolean;
}

export const useAds = (placement: string) => {
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const q = query(
                    collection(db, 'ads'),
                    where('placement', '==', placement),
                    where('active', '==', true)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    // Get a random active ad for this placement
                    const ads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
                    const randomAd = ads[Math.floor(Math.random() * ads.length)];
                    setAd(randomAd);
                }
            } catch (error) {
                console.error("Error fetching ad:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [placement]);

    return { ad, loading };
};
