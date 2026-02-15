import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { googleProvider } from '../lib/firebase';

import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { user, isAdmin, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const navigate = useNavigate();

    // TEMPORARY: Direct redirect for testing
    React.useEffect(() => {
        navigate('/admin');
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err: any) {
            setError('Invalid email or password. Please try again.');
            console.error(err);
        } finally {
            setLocalLoading(false);
        }
    };

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
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Access to Asre Hazir CMS
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-800 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-800 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={localLoading || loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all font-semibold"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LogIn className="h-5 w-5 text-red-300 group-hover:text-white" />
                            </span>
                            {localLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-zinc-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-zinc-900 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={localLoading || loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm bg-white dark:bg-zinc-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none transition-all duration-200 active:scale-95"
                    >
                        <Chrome className="h-5 w-5 text-red-500" />
                        <span className="font-semibold">Sign in with Google</span>
                    </button>
                </form>

                {user && !isAdmin && !loading && (
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50">
                        <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-400">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm font-semibold">Access Denied</span>
                        </div>
                        <p className="text-xs text-amber-700 dark:text-amber-500 mb-3">
                            You are logged in, but your account does not have admin privileges. Please contact the developer with your UID:
                        </p>
                        <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                            <code className="text-[10px] break-all font-mono text-gray-800 dark:text-gray-200">
                                {user.uid}
                            </code>
                            <button
                                onClick={() => navigator.clipboard.writeText(user.uid)}
                                className="text-[10px] text-red-600 font-semibold hover:underline"
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
