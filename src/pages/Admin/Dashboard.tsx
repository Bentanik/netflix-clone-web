import { motion } from 'framer-motion';
import { Film, Users, Tag, UserPlus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategoriesQuery, usePeopleQuery, useMediaQuery } from '@/hooks/useAdmin';

/**
 * Admin Dashboard Page
 * Trang tổng quan cho admin
 */
export default function AdminDashboard() {
    // Fetch data for stats
    const { data: categoriesData } = useCategoriesQuery({ page: 1, pageSize: 1 });
    const { data: peopleData } = usePeopleQuery({ page: 1, pageSize: 1 });
    const { data: mediaData } = useMediaQuery({ page: 1, pageSize: 1 });

    const stats = [
        {
            icon: Film,
            label: 'Total Media',
            value: mediaData?.totalItems?.toString() || '0',
            change: '+12%',
            positive: true,
            path: '/admin/media'
        },
        {
            icon: Tag,
            label: 'Categories',
            value: categoriesData?.totalItems?.toString() || '0',
            change: '+5%',
            positive: true,
            path: '/admin/categories'
        },
        {
            icon: UserPlus,
            label: 'People',
            value: peopleData?.totalItems?.toString() || '0',
            change: '+8%',
            positive: true,
            path: '/admin/people'
        },
        {
            icon: Users,
            label: 'Active Users',
            value: '1,234',
            change: '+15%',
            positive: true,
            path: '/admin/users'
        },
        {
            icon: TrendingUp,
            label: 'Watch Time',
            value: '12.5K hrs',
            change: '+20%',
            positive: true,
            path: '/admin/analytics'
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-zinc-400">Welcome back! Here's what's happening with your platform.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Link
                        key={stat.label}
                        to={stat.path}
                        className="block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-600/20 rounded-lg">
                                    <stat.icon className="w-6 h-6 text-red-600" />
                                </div>
                                <span
                                    className={`text-sm font-semibold ${stat.positive ? 'text-green-500' : 'text-red-500'
                                        }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-zinc-400 text-sm">{stat.label}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link to="/admin/media/create">
                            <motion.button
                                className="w-full flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Film size={20} />
                                Tạo Media Mới
                            </motion.button>
                        </Link>
                        <Link to="/admin/categories">
                            <motion.button
                                className="w-full flex items-center gap-3 p-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg text-white transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Tag size={20} />
                                Quản lý thể loại
                            </motion.button>
                        </Link>
                        <Link to="/admin/people">
                            <motion.button
                                className="w-full flex items-center gap-3 p-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg text-white transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <UserPlus size={20} />
                                Thêm diễn viên
                            </motion.button>
                        </Link>
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white mb-4">Thống kê nhanh</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Media hôm nay</span>
                            <span className="text-white font-semibold">+5</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Thể loại phổ biến</span>
                            <span className="text-white font-semibold">Hành động</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Tổng thời lượng</span>
                            <span className="text-white font-semibold">1,250 giờ</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-4">Hoạt động gần đây</h2>
                <div className="space-y-4">
                    <div className="text-center py-8 text-zinc-500">
                        <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Chưa có hoạt động nào gần đây</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
