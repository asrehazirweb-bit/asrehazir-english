import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Lock, Chrome } from 'lucide-react';
import { googleProvider } from '../lib/firebase';

import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { user, isAdmin, loading } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // TEMPORARY: Direct redirect for testing
    React.useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
    }, [navigate, isAdmin]);

    const handleGoogleLogin = async () => {
        setLocalLoading(true);
        setError('');
        try {
            // Using Popup for immediate feedback
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Login Success UID:", result.user.uid);
            // navigate('/admin') will be handled by the useEffect
        } catch (err: any) {
            console.error("Popup Login Error:", err);
            setError(`Login failed: ${err.message}`);
            setLocalLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access to Asre Hazir CMS
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6">
                    {error && (
                        <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
                            {error}
                        </div>
                    )}
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={localLoading || loading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-200 active:scale-95 group"
                        >
                            <Chrome className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-bold">Sign in with Google</span>
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-500">
                        Use your authorized Google account to access the dashboard.
                    </p>
                </div>

                {user && !isAdmin && !loading && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-2 mb-2 text-amber-800">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm font-semibold">Access Denied</span>
                        </div>
                        <p className="text-xs text-amber-700 mb-3">
                            You are logged in, but your account does not have admin privileges. Please contact the developer with your UID:
                        </p>
                        <div className="bg-white p-2 rounded border border-amber-200 flex items-center justify-between">
                            <code className="text-[10px] break-all font-mono text-gray-800">
                                {user.uid}
                            </code>
                            <button
                                onClick={() => navigator.clipboard.writeText(user.uid)}
                                className="text-[10px] text-primary font-semibold hover:underline"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
