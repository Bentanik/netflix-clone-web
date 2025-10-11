import { motion } from 'framer-motion';

interface MovieMetadata {
    cast: string[];
    genres: string[];
    creators: string[];
    ageRating: string;
}

interface DetailsSectionProps {
    metadata: MovieMetadata;
}

export default function DetailsSection({ metadata }: DetailsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="px-12 mt-12 grid md:grid-cols-2 gap-8"
        >
            <div>
                <h3 className="text-zinc-400 mb-2">Cast:</h3>
                <p className="text-white">{metadata.cast.join(', ')}</p>
            </div>
            <div>
                <h3 className="text-zinc-400 mb-2">Genres:</h3>
                <p className="text-white">{metadata.genres.join(', ')}</p>
            </div>
            <div>
                <h3 className="text-zinc-400 mb-2">Creators:</h3>
                <p className="text-white">{metadata.creators.join(', ')}</p>
            </div>
            <div>
                <h3 className="text-zinc-400 mb-2">Rating:</h3>
                <p className="text-white">{metadata.ageRating}</p>
            </div>
        </motion.div>
    );
}
