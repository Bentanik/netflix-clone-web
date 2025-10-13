import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    type = 'danger',
    loading = false
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            bg: 'bg-red-500',
            hover: 'hover:bg-red-600',
            icon: 'text-red-500'
        },
        warning: {
            bg: 'bg-yellow-500',
            hover: 'hover:bg-yellow-600',
            icon: 'text-yellow-500'
        },
        info: {
            bg: 'bg-blue-500',
            hover: 'hover:bg-blue-600',
            icon: 'text-blue-500'
        }
    };

    const currentStyle = typeStyles[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-md w-full mx-4"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={24} className={currentStyle.icon} />
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>
                    <motion.button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={loading}
                    >
                        <X size={20} />
                    </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-zinc-300 leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
                    <motion.button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {cancelText}
                    </motion.button>
                    <motion.button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-4 py-2 ${currentStyle.bg} ${currentStyle.hover} text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                            </motion.div>
                        )}
                        {confirmText}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}