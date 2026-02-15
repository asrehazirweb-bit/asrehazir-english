import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

const SAVED_NEWS_COLLECTION = 'saved_news';

export interface SavedNewsItem {
    id?: string;
    userId: string;
    newsId: string;
    title: string;
    image: string;
    category?: string;
    createdAt: any;
}

/**
 * Save a news article for a user
 */
export const saveNewsArticle = async (
    userId: string,
    newsId: string,
    title: string,
    image: string,
    category?: string
): Promise<string> => {
    try {
        // Check if already saved
        const existingQuery = query(
            collection(db, SAVED_NEWS_COLLECTION),
            where('userId', '==', userId),
            where('newsId', '==', newsId)
        );

        const existingDocs = await getDocs(existingQuery);

        if (!existingDocs.empty) {
            console.log('⚠️ News already saved');
            throw new Error('This article is already saved');
        }

        // Save the news
        const docRef = await addDoc(collection(db, SAVED_NEWS_COLLECTION), {
            userId,
            newsId,
            title,
            image,
            category: category || 'general',
            createdAt: serverTimestamp()
        });

        console.log('✅ News saved successfully:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error saving news:', error);
        throw error;
    }
};

/**
 * Remove a saved news article
 */
export const unsaveNewsArticle = async (
    userId: string,
    newsId: string
): Promise<void> => {
    try {
        const q = query(
            collection(db, SAVED_NEWS_COLLECTION),
            where('userId', '==', userId),
            where('newsId', '==', newsId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('Saved article not found');
        }

        // Delete all matching docs (should be only one)
        const deletePromises = querySnapshot.docs.map(doc =>
            deleteDoc(doc.ref)
        );

        await Promise.all(deletePromises);
        console.log('✅ News unsaved successfully');
    } catch (error) {
        console.error('❌ Error unsaving news:', error);
        throw error;
    }
};

/**
 * Get all saved news for a user
 */
export const getSavedNews = async (userId: string): Promise<SavedNewsItem[]> => {
    try {
        const q = query(
            collection(db, SAVED_NEWS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const savedNews: SavedNewsItem[] = [];

        querySnapshot.forEach((doc) => {
            savedNews.push({
                id: doc.id,
                ...doc.data()
            } as SavedNewsItem);
        });

        console.log(`✅ Fetched ${savedNews.length} saved articles`);
        return savedNews;
    } catch (error) {
        console.error('❌ Error fetching saved news:', error);
        throw error;
    }
};

/**
 * Check if a news article is saved by user
 */
export const isNewsSaved = async (
    userId: string,
    newsId: string
): Promise<boolean> => {
    try {
        const q = query(
            collection(db, SAVED_NEWS_COLLECTION),
            where('userId', '==', userId),
            where('newsId', '==', newsId)
        );

        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('❌ Error checking saved status:', error);
        return false;
    }
};
