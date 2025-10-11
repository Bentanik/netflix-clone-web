import { motion } from 'framer-motion';
import { Film, Users, TrendingUp, DollarSign } from 'lucide-react';

/**
 * Admin Dashboard Page
 * Trang tổng quan cho admin
 */
export default function AdminDashboard() {
    const stats = [
        {
            icon: Film,
            label: 'Total Movies',
            value: '1,234',
            change: '+12%',
            positive: true,
        },
        {
            icon: Users,
            label: 'Active Users',
            value: '45,678',
            change: '+8%',
            positive: true,
        },
        {
            icon: TrendingUp,
            label: 'Watch Time',
            value: '234K hrs',
            change: '+15%',
            positive: true,
        },
        {
            icon: DollarSign,
            label: 'Revenue',
            value: '$123K',
            change: '-3%',
            positive: false,
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
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
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
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zinc-800 rounded-lg"></div>
                                <div>
                                    <p className="text-white font-medium">Movie Title {item}</p>
                                    <p className="text-zinc-400 text-sm">Added 2 hours ago</p>
                                </div>
                            </div>
                            <span className="text-green-500 text-sm font-semibold">Published</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
