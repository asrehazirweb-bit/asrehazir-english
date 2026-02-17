import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, Users, Eye, TrendingUp, Clock, BarChart3, ChevronRight, Zap } from 'lucide-react';
import { useNews } from '../../hooks/useNews';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const { news, loading, formatTime } = useNews('All', 5);
    const { news: allNews } = useNews('All', 1000);

    const stats = [
        { label: 'Total News', value: allNews.length.toString(), icon: <FileText className="text-red-600" />, trend: '+Live', color: 'from-red-500/10 to-red-500/0' },
        { label: 'Total Views', value: '45.2k', icon: <Eye className="text-black" />, trend: '+5.4%', color: 'from-zinc-500/10 to-zinc-500/0' },
        { label: 'Subscribers', value: '890', icon: <Users className="text-red-700" />, trend: '+2.1%', color: 'from-red-700/10 to-red-700/0' },
        { label: 'Engagement', value: '12.5%', icon: <TrendingUp className="text-black" />, trend: '+1.2%', color: 'from-zinc-400/10 to-zinc-400/0' },
    ];

    const categoryCounts = allNews.reduce((acc: any, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const topCategories = Object.entries(categoryCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 4);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 1. WELCOME BANNER */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-600 text-[12px] font-bold text-white uppercase tracking-widest rounded-full">Newsroom Active</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-gray-900 dark:text-white leading-none mb-4">
                        Welcome, <span className="text-red-600 italic">{user?.displayName?.split(' ')[0] || 'Admin'}!</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-sans leading-relaxed">
                        Welcome to the <span className="text-black dark:text-white font-bold underline decoration-red-600 decoration-4 underline-offset-8">Asre Hazir</span> control center. Your broadcasts are reaching thousands of readers right now.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="bg-red-600 hover:bg-black text-white px-10 py-4 rounded-xl font-bold text-sm transition-all flex items-center gap-3 shadow-lg shadow-red-600/20 group">
                            <Zap size={16} className="group-hover:animate-bounce" /> Publish New Story
                        </button>
                        <button className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-10 py-4 rounded-xl font-bold text-sm transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700">
                            View Live Portal
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-zinc-600/5 rounded-full blur-[80px]"></div>
            </div>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 group hover:border-red-500 overflow-hidden transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors shadow-sm">
                                    {stat.icon}
                                </div>
                                <span className="text-green-500 text-[12px] font-bold bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md">{stat.trend}</span>
                            </div>
                            <h3 className="text-gray-400 dark:text-zinc-500 text-[14px] font-bold mb-1">{stat.label}</h3>
                            <p className="text-4xl font-black text-gray-900 dark:text-white">{loading ? '...' : stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 3. RECENT ACTIVITY desk */}
                <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Recent Activity</h2>
                            <p className="text-[12px] text-gray-400 font-bold mt-1">Live from the Newsroom Desk</p>
                        </div>
                        <button className="text-sm font-bold text-red-600 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                            <ChevronRight size={16} /> Full Details
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="py-20 text-center text-gray-400 flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm uppercase tracking-widest font-black">Loading Data...</span>
                            </div>
                        ) : news.length > 0 ? (
                            news.map((item) => (
                                <div key={item.id} className="group flex items-center justify-between p-5 border border-transparent hover:border-gray-50 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 rounded-2xl transition-all duration-300">
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-red-600 font-black text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                {item.author?.substring(0, 2).toUpperCase() || 'AH'}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug">
                                                Published: <span className="font-serif italic text-base">"{item.title}"</span>
                                            </p>
                                            <div className="flex items-center gap-4 mt-1.5">
                                                <span className="text-[12px] font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded shadow-sm">
                                                    {item.category}
                                                </span>
                                                <span className="text-[12px] text-gray-400 flex items-center gap-1 font-bold">
                                                    <Clock size={12} /> {formatTime(item.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[12px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
                                            <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-zinc-800 flex items-center justify-center text-gray-400 group-hover:text-red-600 group-hover:border-red-600 transition-all cursor-pointer">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-gray-400 font-sans text-sm font-bold italic">No recent activity recorded.</div>
                        )}
                    </div>
                </div>

                {/* 4. PERFORMANCE BREAKDOWN */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-zinc-900 dark:bg-black p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-red-600/40 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <BarChart3 className="text-red-500" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Category Index</h3>
                            </div>

                            <div className="space-y-6">
                                {topCategories.length > 0 ? topCategories.map(([cat, count]: [any, any]) => (
                                    <div key={cat} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-bold text-zinc-400">{cat}</span>
                                            <span className="text-sm font-black">{count} News</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-600 transition-all duration-1000"
                                                style={{ width: `${(count / allNews.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )) : <div className="text-sm text-zinc-500 text-center py-4">No data available</div>}
                            </div>

                            <button className="w-full mt-8 py-4 rounded-xl border border-zinc-800 text-[12px] font-bold hover:bg-white hover:text-black transition-all">
                                View Detailed Analysis
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm flex-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">System Status</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white tracking-tight">Cloud Storage</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Optimal Performance</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white tracking-tight">Firestore Database</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Low Latency</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,44,44,0.4)] animate-pulse"></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white tracking-tight">API Broadcast</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">High Traffic Alert</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
