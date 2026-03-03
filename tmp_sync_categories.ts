
import { db } from './src/lib/firebase';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

async function syncSouthIndia() {
    console.log('🔄 Syncing South India sub-category...');

    // 1. Update English Portal
    const qEng = query(collection(db, 'categories_english'), where('name', '==', 'National News'));
    const snapEng = await getDocs(qEng);
    if (!snapEng.empty) {
        await updateDoc(snapEng.docs[0].ref, {
            subCategories: arrayUnion('South India')
        });
        console.log('✅ English: South India added to National News');
    }

    // 2. Update Urdu Portal
    const qUrdu = query(collection(db, 'categories_urdu'), where('name', '==', 'قومی خبریں'));
    const snapUrdu = await getDocs(qUrdu);
    if (!snapUrdu.empty) {
        await updateDoc(snapUrdu.docs[0].ref, {
            subCategories: arrayUnion('جنوبی ہند')
        });
        console.log('✅ Urdu: جنوبی ہند added to قومی خبریں');
    }
}

syncSouthIndia().catch(console.error);
