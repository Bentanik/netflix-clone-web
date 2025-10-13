import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/admin';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '@/types/admin';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCategoryRequest | UpdateCategoryRequest) => void;
    loading: boolean;
    title: string;
    initialData?: Category | null;
}

export default function CategoryModal({
    isOpen,
    onClose,
    onSubmit,
    loading,
    title,
    initialData
}: CategoryModalProps) {
    const [name, setName] = useState(initialData?.name || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        if (initialData) {
            onSubmit({ id: initialData.id, name: name.trim() });
        } else {
            onSubmit({ name: name.trim() });
        }
    };

    const handleClose = () => {
        if (!loading) {
            setName(initialData?.name || '');
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
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-md w-full mx-4"
            >
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tên thể loại
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên thể loại..."
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                                required
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
                            disabled={loading || !name.trim()}
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