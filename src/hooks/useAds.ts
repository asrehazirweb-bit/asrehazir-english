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

// Session cache to ensure ads stay static once loaded
const adCache: Record<string, Ad> = {};

export const useAds = (placement: string) => {
    const [ad, setAd] = useState<Ad | null>(adCache[placement] || null);
    const [loading, setLoading] = useState(!adCache[placement]);

    useEffect(() => {
        // If already in cache, do nothing
        if (adCache[placement]) {
            setLoading(false);
            return;
        }

        const fetchAd = async () => {
            try {
                const q = query(
                    collection(db, 'ads'),
                    where('placement', '==', placement),
                    where('active', '==', true)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const ads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
                    const randomAd = ads[Math.floor(Math.random() * ads.length)];
                    
                    // Store in cache for this session
                    adCache[placement] = randomAd;
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
