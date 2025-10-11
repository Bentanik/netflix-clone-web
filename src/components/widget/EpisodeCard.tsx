import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

interface EpisodeCardProps {
    episode: number;
    title: string;
    image: string;
    description: string;
    onPlay?: () => void;
}

/**
 * EpisodeCard - Small episode card for browsing
 * Used in episode lists (like Inside Reagan in the image)
 */
export default function EpisodeCard({
    episode,
    title,
    image,
    description,
    onPlay,
}: EpisodeCardProps) {
    return (
        <motion.div
            className="group relative cursor-pointer bg-zinc-900 rounded-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={onPlay}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-black">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Section */}
            <div className="p-3">
                {/* Episode Number and Menu */}
                <div className="flex items-start justify-between mb-2">
                    <span className="text-zinc-400 text-sm font-medium">
                        Episode {episode}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Show menu
                        }}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-base mb-2 line-clamp-1">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
