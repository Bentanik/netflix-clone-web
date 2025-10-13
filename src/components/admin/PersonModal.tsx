import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/admin';
import { Gender, type Person, type CreatePersonRequest, type UpdatePersonRequest } from '@/types/admin';

interface PersonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePersonRequest | UpdatePersonRequest) => void;
    loading: boolean;
    title: string;
    initialData?: Person | null;
}

export default function PersonModal({
    isOpen,
    onClose,
    onSubmit,
    loading,
    title,
    initialData
}: PersonModalProps) {
    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || '',
        otherName: initialData?.otherName || '',
        shortBio: initialData?.shortBio || '',
        avatar: initialData?.avatar || '',
        gender: initialData?.gender || Gender.MALE,
        day: initialData ? new Date(initialData.dateOfBirth).getDate() : 1,
        month: initialData ? new Date(initialData.dateOfBirth).getMonth() + 1 : 1,
        year: initialData ? new Date(initialData.dateOfBirth).getFullYear() : 1990
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            otherName: formData.otherName.trim() || null,
            shortBio: formData.shortBio.trim() || null,
            avatar: formData.avatar.trim() || null
        };

        if (initialData) {
            onSubmit({ ...submitData, id: initialData.id } as UpdatePersonRequest);
        } else {
            onSubmit(submitData as CreatePersonRequest);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden"
            >
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Họ tên *
                            </label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                placeholder="Nhập họ tên..."
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Other Name */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tên khác
                            </label>
                            <input
                                type="text"
                                value={formData.otherName}
                                onChange={(e) => setFormData(prev => ({ ...prev, otherName: e.target.value }))}
                                placeholder="Tên nghệ danh, biệt danh..."
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Giới tính *
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData(prev => ({ ...prev, gender: Number(e.target.value) as Gender }))}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                                required
                            >
                                <option value={Gender.MALE}>Nam</option>
                                <option value={Gender.FEMALE}>Nữ</option>
                                <option value={Gender.OTHER}>Khác</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Ngày sinh *
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <select
                                    value={formData.day}
                                    onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select
                                    value={formData.month}
                                    onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    value={formData.year}
                                    onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Avatar URL */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                value={formData.avatar}
                                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        {/* Short Bio */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tiểu sử ngắn
                            </label>
                            <textarea
                                value={formData.shortBio}
                                onChange={(e) => setFormData(prev => ({ ...prev, shortBio: e.target.value }))}
                                placeholder="Mô tả ngắn về người này..."
                                rows={3}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
                        <motion.button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hủy
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={loading || !formData.fullName.trim()}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading && <LoadingSpinner size={16} />}
                            {initialData ? 'Cập nhật' : 'Tạo'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}