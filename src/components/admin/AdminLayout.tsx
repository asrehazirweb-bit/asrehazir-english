import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { LayoutDashboard, FileText, PlusSquare, LogOut, Home, Settings, ShieldCheck, Zap } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to exit the control center?')) {
            await auth.signOut();
            navigate('/');
        }
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: '/admin/add-news', label: 'News Desk', icon: <PlusSquare size={18} /> },
        { path: '/admin/manage', label: 'Archives', icon: <FileText size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-500">
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 flex flex-col shadow-xl z-20">
                <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                        <ShieldCheck className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Asre Hazir</h2>
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Control Center</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
                    <div>
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Operations</p>
                        <nav className="space-y-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive(item.path)
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                                            : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span className={`${isActive(item.path) ? 'text-white' : 'group-hover:text-red-600'} transition-colors`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Platform</p>
                        <nav className="space-y-1.5">
                            <Link to="/" className="flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all group">
                                <Home size={18} className="group-hover:text-red-600 transition-colors" />
                                <span className="text-sm font-bold tracking-tight">Main Portal</span>
                            </Link>
                            <button className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all group cursor-not-allowed opacity-50">
                                <Settings size={18} />
                                <span className="text-sm font-bold tracking-tight">Portal Config</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-50 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center text-white font-black text-xs">
                                {auth.currentUser?.displayName?.[0] || 'A'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">{auth.currentUser?.displayName || 'Admin'}</p>
                                <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Authorized
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <LogOut size={16} />
                        <span>Sign Out Account</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-500 pt-8 px-8 pb-12">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs / Top Bar Placeholder */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50 dark:border-zinc-800/50">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                            <span>Admin</span>
                            <span className="text-red-600">/</span>
                            <span className="text-gray-900 dark:text-white italic">{location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">v1.2.4 Active</span>
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-red-600 shadow-lg">
                                <Zap size={14} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
