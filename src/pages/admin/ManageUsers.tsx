import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserCheck, UserX, Clock, Shield, Mail, Search, AlertCircle, Calendar } from 'lucide-react';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: "admin" | "user";
    adminRequest: boolean;
    requestStatus: "pending" | "approved" | "rejected" | null;
    createdAt?: any;
}

const ManageUsers: React.FC = () => {
    const [requests, setRequests] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // PART 3: Display all users where requestStatus = "pending"
        const q = query(
            collection(db, 'users'),
            where('adminRequest', '==', true),
            where('requestStatus', '==', 'pending')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqData = snapshot.docs.map(doc => ({ ...doc.data() } as UserProfile));
            setRequests(reqData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAction = async (uid: string, action: 'approve' | 'reject') => {
        try {
            const userRef = doc(db, 'users', uid);
            if (action === 'approve') {
                // PART 4: Approval Logic
                await updateDoc(userRef, {
                    role: 'admin',
                    requestStatus: 'approved',
                    adminRequest: false,
                    updatedAt: serverTimestamp()
                });
            } else {
                // PART 4: Reject Logic
                await updateDoc(userRef, {
                    requestStatus: 'rejected',
                    adminRequest: false,
                    updatedAt: serverTimestamp()
                });
            }
        } catch (error) {
            console.error(`Error ${action}ing user:`, error);
            alert(`Failed to ${action} user.`);
        }
    };

    const filteredRequests = requests.filter(req =>
        req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Admin Access Requests</h1>
                <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Review and manage administrative permissions</p>
            </header>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Total Pending</p>
                        <h3 className="text-4xl font-black text-gray-900">{requests.length}</h3>
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Clock size={28} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Security Status</p>
                        <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">System Guarded</h3>
                    </div>
                    <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900">
                        <Shield size={28} />
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search requests by email or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-xl shadow-gray-100"
                />
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Pending Approval Pool</h3>
                </div>

                <div className="divide-y divide-gray-50">
                    {loading ? (
                        <div className="p-20 text-center text-gray-400 animate-pulse uppercase font-black tracking-widest text-[10px]">
                            Polling user database...
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                                <AlertCircle size={40} />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No pending requests found</p>
                        </div>
                    ) : (
                        filteredRequests.map((req) => (
                            <div
                                key={req.uid}
                                className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 transition-all"
                            >
                                <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center text-white text-xl font-black">
                                        {req.displayName?.[0] || 'U'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-base font-black text-gray-900 truncate uppercase tracking-tight">
                                            {req.displayName || 'Unknown User'}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <Mail size={12} className="text-primary" />
                                                {req.email}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <Calendar size={12} className="text-primary" />
                                                {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'New Request'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    {/* Approve Button */}
                                    <button
                                        onClick={() => handleAction(req.uid, 'approve')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
                                    >
                                        <UserCheck size={16} /> Approve Access
                                    </button>

                                    {/* Reject Button */}
                                    <button
                                        onClick={() => handleAction(req.uid, 'reject')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                    >
                                        <UserX size={16} /> Deny
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Security Note */}
            <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter italic">Warning: Level 4 Authorization</h3>
                    <p className="text-[10px] font-bold text-zinc-500 mt-1 uppercase tracking-widest">Approving users delegates full control over news and advertisements</p>
                </div>
                <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-black">
                            {i}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
