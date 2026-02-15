import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User, getRedirectResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isAdmin: false, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
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

            // Set user state immediately
            setUser(user);

            if (user) {
                // If we have a user, keep loading true while we check their role
                setLoading(true);
                try {
                    const userRef = doc(db, "users", user.uid);
                    console.log("Fetching Firestore doc for UID:", user.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("Firestore User Data:", userData);
                        if (userData.role === 'admin') {
                            setIsAdmin(true);
                        } else {
                            console.warn("User role is not admin:", userData.role);
                            setIsAdmin(false);
                        }
                    } else {
                        // FOR INITIAL SETUP ONLY: Create user with admin role
                        console.log("No user document found. Creating admin profile for:", user.email);
                        try {
                            const newUserData = {
                                email: user.email,
                                role: 'admin',
                                createdAt: new Date()
                            };
                            await setDoc(doc(db, "users", user.uid), newUserData);
                            console.log("Admin user created successfully");
                            setIsAdmin(true);
                        } catch (e) {
                            console.error("Error creating user:", e);
                            setIsAdmin(false);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);
                    setIsAdmin(false);
                } finally {
                    setLoading(false);
                }
            } else {
                // No user, definitely not an admin
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
