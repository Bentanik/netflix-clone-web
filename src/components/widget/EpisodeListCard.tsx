import { motion } from 'framer-motion';
import { Play, Download } from 'lucide-react';

interface EpisodeListCardProps {
    episode: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    isWatched?: boolean;
    isContinueWatching?: boolean;
    onPlay?: () => void;
}

/**
 * EpisodeListCard - Horizontal episode card for detail pages
 * Used in movie detail episodes section (like the episodes list in image 3)
 */
export default function EpisodeListCard({
    episode,
    title,
    image,
    description,
    duration,
    isWatched = false,
    isContinueWatching = false,
    onPlay,
}: EpisodeListCardProps) {
    return (
        <motion.div
            className="group relative flex gap-4 p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={onPlay}
        >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-36 h-20 overflow-hidden rounded bg-black">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                </div>

                {/* Status badges */}
                {isWatched && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        Watched
                    </div>
                )}
                {isContinueWatching && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-semibold px-2 py-0.5 rounded">
                        Continue watching
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">
                            {episode}. {title}
                        </h3>
                        <span className="text-zinc-400 text-sm">{duration}</span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Download episode
                        }}
                        className="ml-4 text-zinc-400 hover:text-white transition-colors"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
