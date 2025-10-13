import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    text?: string;
}

export default function LoadingSpinner({
    size = 24,
    className = '',
    text
}: LoadingSpinnerProps) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <Loader2 size={size} className="text-red-500" />
            </motion.div>
            {text && (
                <span className="text-zinc-400 text-sm">{text}</span>
            )}
        </div>
    );
}