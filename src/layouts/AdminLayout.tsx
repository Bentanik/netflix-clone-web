import { Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Film, Users, Settings, LogOut } from 'lucide-react';

/**
 * AdminLayout - Layout cho quản trị viên
 * Bao gồm Sidebar và nội dung chính
 */
export default function AdminLayout() {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Film, label: 'Movies', path: '/admin/movies' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="h-screen bg-[#141414] text-white flex overflow-hidden">
            {/* Sidebar - Fixed full height */}
            <aside className="w-64 h-full bg-black border-r border-zinc-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-zinc-800 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-red-600">Netflix Admin</h1>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-red-600 text-white'
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-zinc-800 flex-shrink-0">
                    <motion.button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </motion.button>
                </div>
            </aside>

            {/* Main Content - Scrollable */}
            <main className="flex-1 h-full overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
