import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MovieRow from '@/components/widget/MovieRow';

interface Movie {
    id: number;
    title: string;
    image: string;
    rating: number;
    year: number;
    match: number;
}

interface SimilarContentSectionProps {
    movies: Movie[];
}

export default function SimilarContentSection({ movies }: SimilarContentSectionProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12"
        >
            <MovieRow
                title="More Like This"
                movies={movies}
                onPlay={(movieId) => navigate(`/watch/${movieId}`)}
                onInfo={(movieId) => navigate(`/movie/${movieId}`)}
            />
        </motion.div>
    );
}
