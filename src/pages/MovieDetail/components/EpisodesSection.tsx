import { motion } from 'framer-motion';
import { EpisodeListCard } from '@/components';

interface Episode {
    id: number;
    number: number;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    isWatched?: boolean;
    isContinueWatching?: boolean;
}

interface EpisodesSectionProps {
    episodes: Episode[];
    onPlayEpisode: (episodeId: number) => void;
}

export default function EpisodesSection({ episodes, onPlayEpisode }: EpisodesSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-12 mt-12"
        >
            <h2 className="text-3xl font-bold mb-6">Episodes</h2>
            <div className="space-y-3">
                {episodes.map((episode, index) => (
                    <motion.div
                        key={episode.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                    >
                        <EpisodeListCard
                            episode={episode.number}
                            title={episode.title}
                            image={episode.thumbnail}
                            description={episode.description}
                            duration={episode.duration}
                            isWatched={episode.isWatched}
                            isContinueWatching={episode.isContinueWatching}
                            onPlay={() => onPlayEpisode(episode.id)}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
