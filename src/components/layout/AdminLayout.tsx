import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Users,
    Settings,
    BarChart3,
    Search,
    Bell,
    LogOut,
    ChevronDown,
    Folder,
    Plus,
    Film,
    Monitor
} from 'lucide-react';

interface SidebarItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    path: string;
    badge?: number;
}

const sidebarItems: SidebarItem[] = [
    {
        id: 'overview',
        title: 'Dashboard',
        icon: Home,
        path: '/admin',
    },
    {
        id: 'analytics',
        title: 'Analytics',
        icon: BarChart3,
        path: '/admin/analytics',
    },
    {
        id: 'media',
        title: 'Movies & Shows',
        icon: Film,
        path: '/admin/media',
    },
    {
        id: 'categories',
        title: 'Categories',
        icon: Folder,
        path: '/admin/categories',
    },
    {
        id: 'people',
        title: 'Cast & Crew',
        icon: Users,
        path: '/admin/people',
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: Settings,
        path: '/admin/settings',
    }
];

const AdminLayout: React.FC = () => {
    const [activeItem, setActiveItem] = useState('overview');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = sidebarItems.find(item => item.path === currentPath);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
    }, [location.pathname]);

    const handleNavigation = (item: SidebarItem) => {
        setActiveItem(item.id);
        navigate(item.path);
    };

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            {/* Sidebar */}
            <motion.div
                className="fixed left-0 top-0 h-full bg-[#0f0f0f] border-r border-gray-800 z-30"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                initial={{ width: '280px' }}
            >
                {/* Netflix Logo */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-[#e50914] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Netflix</h1>
                                <p className="text-xs text-gray-400">Admin Portal</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 px-3">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-4"
                        >
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                                Content Management
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="space-y-2">
                        {sidebarItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${activeItem === item.id
                                    ? 'bg-[#e50914] text-white shadow-lg shadow-red-900/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <item.icon
                                    size={20}
                                    className={`mr-3 transition-colors`}
                                />
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex items-center justify-between w-full"
                                    >
                                        <span className="font-medium">{item.title}</span>
                                        {item.badge && (
                                            <span className="bg-[#e50914] text-white text-xs rounded-full px-2 py-1">
                                                {item.badge}
                                            </span>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 text-white"
                        >
                            <div className="flex items-center mb-2">
                                <Monitor size={16} className="mr-2" />
                                <span className="text-sm font-medium">Admin Tools</span>
                            </div>
                            <p className="text-xs opacity-90 mb-3">
                                Manage your Netflix content
                            </p>
                            <button className="w-full bg-[#e50914] hover:bg-red-700 rounded-lg py-2 text-xs font-medium transition-all">
                                View Analytics
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="transition-all duration-300"
                animate={{
                    marginLeft: '280px',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {/* Top Header */}
                <header className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-20">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative"
                            >
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search movies, shows, actors..."
                                    className="pl-10 pr-4 py-2 w-80 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent transition-all text-white placeholder-gray-400"
                                />
                            </motion.div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2 rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <Bell size={20} className="text-gray-400" />
                                <span className="absolute -top-1 -right-1 bg-[#e50914] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </motion.button>

                            {/* Add Content Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-2 bg-[#e50914] hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg transition-all"
                            >
                                <Plus size={18} />
                                <span>Add Content</span>
                            </motion.button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">A</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-white">Admin User</p>
                                        <p className="text-xs text-gray-400">Content Manager</p>
                                    </div>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </motion.button>

                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-700 py-2 z-50"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-700">
                                            <p className="font-medium text-white">Admin User</p>
                                            <p className="text-sm text-gray-400">admin@netflix.com</p>
                                        </div>
                                        <div className="py-2">
                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors flex items-center space-x-3">
                                                <Settings size={16} className="text-gray-400" />
                                                <span className="text-gray-300">Settings</span>
                                            </button>
                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors flex items-center space-x-3">
                                                <LogOut size={16} className="text-gray-400" />
                                                <span className="text-gray-300">Sign out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </motion.div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                />
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;