import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}: PaginationProps) {
    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisible - 1);

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            {/* Previous Button */}
            <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition-colors ${currentPage === 1
                        ? 'border-zinc-700 text-zinc-500 cursor-not-allowed'
                        : 'border-zinc-600 text-white hover:bg-zinc-800'
                    }`}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
                <ChevronLeft size={16} />
            </motion.button>

            {/* Page Numbers */}
            {visiblePages.map((page, index) => (
                <motion.button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={typeof page !== 'number'}
                    className={`px-3 py-2 rounded-lg border transition-colors min-w-[40px] ${page === currentPage
                            ? 'bg-red-600 border-red-600 text-white'
                            : typeof page === 'number'
                                ? 'border-zinc-600 text-white hover:bg-zinc-800'
                                : 'border-transparent text-zinc-500 cursor-default'
                        }`}
                    whileHover={typeof page === 'number' && page !== currentPage ? { scale: 1.05 } : {}}
                    whileTap={typeof page === 'number' && page !== currentPage ? { scale: 0.95 } : {}}
                >
                    {page}
                </motion.button>
            ))}

            {/* Next Button */}
            <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                        ? 'border-zinc-700 text-zinc-500 cursor-not-allowed'
                        : 'border-zinc-600 text-white hover:bg-zinc-800'
                    }`}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
                <ChevronRight size={16} />
            </motion.button>
        </div>
    );
}