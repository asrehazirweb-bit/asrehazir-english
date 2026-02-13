import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Users, Eye, TrendingUp, Clock, BarChart3, ChevronRight, Zap } from 'lucide-react';
import { useNews } from '../../hooks/useNews';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const { news, loading, formatTime } = useNews('All', 5);
    // Fetch all for total count (in a real app we might use a counter doc, but for now this works)
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
            <div className="relative overflow-hidden bg-white dark:bg-[#0c0e12] p-8 md:p-12 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-600 text-[10px] font-black text-white uppercase tracking-[0.3em] rounded-md">Newsroom Active</span>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4 italic">
                        Maindeck, <span className="text-red-600">{user?.displayName?.split(' ')[0] || 'Admin'}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-500 text-base md:text-lg font-sans tracking-tight leading-relaxed max-w-lg">
                        You are at the <span className="text-black dark:text-white font-bold border-b-2 border-red-600">Asre Hazir</span> core. Finalize your broadcasts and monitor global reach in real-time.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="bg-red-600 hover:bg-black text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 shadow-2xl shadow-red-600/30 group active:scale-95">
                            Broadcast New Desk <Zap size={14} className="group-hover:text-amber-400 transition-colors" />
                        </button>
                        <button className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-400 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-white">
                            Monitor Portal
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full -mr-64 -mt-64 blur-[120px]"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-zinc-900/40 rounded-full blur-[100px]"></div>
            </div>


            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`relative bg-white dark:bg-[#0c0e12] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800/50 group hover:border-red-500/50 overflow-hidden transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl group-hover:bg-white dark:group-hover:bg-zinc-800 transition-colors shadow-sm">
                                    {stat.icon}
                                </div>
                                <span className="text-green-500 text-[9px] font-black uppercase tracking-[0.2em] bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md border border-green-500/20">{stat.trend}</span>
                            </div>
                            <h3 className="text-gray-400 dark:text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] mb-1">{stat.label}</h3>
                            <p className="text-4xl font-serif font-black text-gray-900 dark:text-white mb-1 tracking-tighter">{loading ? '...' : stat.value}</p>
                            <div className="w-8 h-1 bg-red-600/20 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 3. RECENT ACTIVITY desk */}
                <div className="lg:col-span-8 bg-white dark:bg-[#0c0e12] p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-serif font-black text-gray-900 dark:text-white uppercase tracking-tight">Broadcast Feed</h2>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1">Real-time Newsroom Synchronization</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800"></div>)}
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-black dark:hover:text-white transition-colors bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-full">
                                LIVE FEED
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="py-20 text-center text-gray-400 flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-[10px] uppercase tracking-widest font-black">Syncing Flux...</span>
                            </div>
                        ) : news.length > 0 ? (
                            news.map((item) => (
                                <div key={item.id} className="group flex items-center justify-between p-4 border border-transparent hover:border-red-600/10 hover:bg-red-50/5 dark:hover:bg-zinc-800/20 rounded-2xl transition-all duration-300">
                                    <div className="flex items-center space-x-5">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-100 dark:border-zinc-700/30 overflow-hidden">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <FileText className="text-red-600/40" size={20} />
                                                )}
                                            </div>
                                            <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 leading-snug group-hover:text-red-600 transition-colors">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest bg-zinc-900 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1 font-black uppercase tracking-widest">
                                                    <Clock size={10} className="text-red-600" /> {formatTime(item.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-gray-400 font-sans uppercase text-[10px] tracking-[0.3em] font-black italic">Station Offline. No broadcasts found.</div>
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
                                <h3 className="text-sm font-black uppercase tracking-[0.3em]">Broadcast Analytics</h3>
                            </div>

                            <div className="space-y-6">
                                {topCategories.length > 0 ? topCategories.map(([cat, count]: [any, any]) => (
                                    <div key={cat} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{cat}</span>
                                            <span className="text-xs font-serif font-black">{count} Broadcasts</span>
                                        </div>
                                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_8px_rgba(239,44,44,0.5)]"
                                                style={{ width: `${(count / allNews.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )) : <div className="text-[10px] text-zinc-500 uppercase tracking-widest text-center py-4">Station ID: Idle</div>}
                            </div>

                            <div className="mt-8 pt-6 border-t border-zinc-800">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-2">Live Engagement</p>
                                <div className="flex items-end gap-1.5 h-12">
                                    {[40, 70, 45, 90, 65, 80, 30, 100, 50].map((h, i) => (
                                        <div key={i} className="flex-1 bg-red-600/20 rounded-t-sm group-hover:bg-red-600/40 transition-all" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0c0e12] p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800/50 shadow-sm flex-1">
                        <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-6">System Heartbeat</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white tracking-tight text-nowrap">Firebase Stack</p>
                                </div>
                                <span className="text-[9px] font-black text-green-500">SYNCED</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white tracking-tight text-nowrap">Cloud Storage</p>
                                </div>
                                <span className="text-[9px] font-black text-green-500">OPTIMIZED</span>
                            </div>
                            <div className="p-4 bg-red-600/5 dark:bg-red-900/5 rounded-2xl border border-red-600/10">
                                <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">Transmission Warning</p>
                                <p className="text-[11px] font-medium text-gray-600 dark:text-zinc-400 leading-tight">High concurrency detected in National segment. Monitor throughput.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
