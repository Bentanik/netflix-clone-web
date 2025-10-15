import { motion } from 'framer-motion';
import {
    Film,
    Users,
    TrendingUp,
    Calendar,
    Play,
    Star,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Netflix Admin Dashboard - Content Management Overview
 */
export default function AdminDashboard() {
    const stats = [
        {
            icon: Film,
            label: 'Total Content',
            value: '2,847',
            change: '+12%',
            positive: true,
            path: '/admin/media',
            description: 'Movies & TV Shows'
        },
        {
            icon: Users,
            label: 'Active Viewers',
            value: '1.2M',
            change: '+18%',
            positive: true,
            path: '/admin/analytics',
            description: 'Monthly active users'
        },
        {
            icon: Play,
            label: 'Watch Hours',
            value: '12.5M',
            change: '+23%',
            positive: true,
            path: '/admin/analytics',
            description: 'Total hours streamed'
        },
        {
            icon: Star,
            label: 'Avg Rating',
            value: '4.2',
            change: '+8.2%',
            positive: true,
            path: '/admin/analytics',
            description: 'Content average rating'
        }
    ];

    const recentContent = [
        {
            title: 'Stranger Things S5',
            type: 'TV Series',
            status: 'In Production',
            views: '1.2M',
            rating: 4.8,
            addedDate: '2 hours ago'
        },
        {
            title: 'The Crown Final Season',
            type: 'TV Series',
            status: 'Released',
            views: '856K',
            rating: 4.6,
            addedDate: '5 hours ago'
        },
        {
            title: 'Red Notice 2',
            type: 'Movie',
            status: 'Post Production',
            views: '2.1M',
            rating: 4.3,
            addedDate: '1 day ago'
        },
        {
            title: 'Wednesday Season 2',
            type: 'TV Series',
            status: 'Filming',
            views: '3.5M',
            rating: 4.9,
            addedDate: '2 days ago'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'released': return 'bg-green-500';
            case 'in production': return 'bg-blue-500';
            case 'filming': return 'bg-yellow-500';
            case 'post production': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Content Dashboard</h1>
                    <p className="text-gray-400 mt-2">Manage your Netflix content library</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-gray-800 rounded-xl px-4 py-2 border border-gray-700">
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-300">October 15, 2025</span>
                        </div>
                    </div>
                    <Link
                        to="/admin/media/create"
                        className="bg-[#e50914] hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2"
                    >
                        <Film size={18} />
                        <span>Add Content</span>
                    </Link>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-[#e50914]/20">
                                <stat.icon size={24} className="text-[#e50914]" />
                            </div>
                            <div className="text-right">
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        {stat.change}
                                    </span>
                                    <TrendingUp size={14} className={`${stat.positive ? 'text-green-400' : 'text-red-400 rotate-180'
                                        }`} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-gray-500 text-xs">{stat.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Content Performance Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 border border-gray-800"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white">Content Performance</h3>
                            <p className="text-gray-400 text-sm">Weekly viewing statistics</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-[#e50914] rounded-full"></div>
                                <span className="text-sm text-gray-400">Views</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-400">Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex items-center justify-center border border-gray-700">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-[#e50914] mx-auto mb-4" />
                            <p className="text-gray-300">Performance Chart</p>
                            <p className="text-sm text-gray-500">Integration with analytics service</p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                >
                    <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>

                    <div className="space-y-4">
                        <Link
                            to="/admin/media/create"
                            className="flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group"
                        >
                            <div className="p-2 bg-[#e50914]/20 rounded-lg">
                                <Film size={20} className="text-[#e50914]" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Add New Content</p>
                                <p className="text-gray-400 text-sm">Upload movies or shows</p>
                            </div>
                        </Link>

                        <Link
                            to="/admin/categories"
                            className="flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Star size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Manage Categories</p>
                                <p className="text-gray-400 text-sm">Organize content types</p>
                            </div>
                        </Link>

                        <Link
                            to="/admin/people"
                            className="flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all group"
                        >
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <Users size={20} className="text-green-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Cast & Crew</p>
                                <p className="text-gray-400 text-sm">Manage talent database</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Recent Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Recent Content</h3>
                    <Link
                        to="/admin/media"
                        className="text-[#e50914] hover:text-red-400 text-sm font-medium transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Title</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Views</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Rating</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Added</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentContent.map((content, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                                <Film size={16} className="text-white" />
                                            </div>
                                            <span className="font-medium text-white">{content.title}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-300">{content.type}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(content.status)}`}>
                                            {content.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-300 font-medium">{content.views}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-1">
                                            <Star size={14} className="text-yellow-400" />
                                            <span className="text-gray-300">{content.rating}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">{content.addedDate}</td>
                                    <td className="py-4 px-4">
                                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                            <Eye size={16} className="text-gray-400" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}