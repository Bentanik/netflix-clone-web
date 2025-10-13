import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import type { Category } from '@/types/admin';

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-400">
                        Tạo: {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={() => onEdit(category)}
                        className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Edit size={16} />
                    </motion.button>
                    <motion.button
                        onClick={() => onDelete(category)}
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 size={16} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}