import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User, getRedirectResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: "admin" | "user";
    adminRequest: boolean;
    requestStatus: "pending" | "approved" | "rejected" | null;
    createdAt?: any;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, isAdmin: false, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Handle redirect result
        getRedirectResult(auth).then((result) => {
            if (result?.user) {
                console.log("Google Redirect Success:", result.user.uid);
            }
        }).catch((error) => {
            console.error("Redirect Error:", error);
        });

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Auth State Changed. User UID:", user?.uid || "null");

            // Set user state
            setUser(user);

            if (user) {
                // Keep loading true while we check their role
                setLoading(true);
                try {
                    const userRef = doc(db, "users", user.uid);
                    console.log("Fetching Firestore doc for UID:", user.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data() as UserData;
                        setUserData(data);
                        console.log("Firestore User Data:", data);
                        setIsAdmin(data.role === 'admin');
                    } else {
                        // Create default user profile if it doesn't exist (PART 1: Registration)
                        console.log("Creating new user profile in Firestore for UID:", user.uid);
                        const newUser: UserData = {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            role: "user",
                            adminRequest: false,
                            requestStatus: null,
                            createdAt: new Date()
                        };

                        // Using setDoc here might need careful Firestore Rules
                        // For now, we update state. In a real app, this might be handled 
                        // by a Cloud Function or a specific registration function to be safe.
                        setUserData(newUser);
                        setIsAdmin(false);

                        // Note: If Firestore rules block this, we'll see an error here.
                        // We will update Firestore rules next.
                        const { setDoc, serverTimestamp } = await import('firebase/firestore');
                        await setDoc(userRef, { ...newUser, createdAt: serverTimestamp() });
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);
                    setIsAdmin(false);
                } finally {
                    setLoading(false);
                }
            } else {
                // No user
                setUserData(null);
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
