import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    debounceMs?: number;
}

export default function SearchBox({
    value,
    onChange,
    placeholder = 'Tìm kiếm...',
    className = '',
    debounceMs = 300
}: SearchBoxProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, onChange, debounceMs]);

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                />
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
                {localValue && (
                    <motion.button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={16} />
                    </motion.button>
                )}
            </div>
        </div>
    );
}