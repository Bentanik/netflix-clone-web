import { MovieHeroBanner } from '@/components';
import type { HeroSlide } from '@/types/hero';

interface MovieHeroSectionProps {
    movie: HeroSlide;
    onWatchNow: (movieId: number) => void;
    onAddToList: (movieId: number) => void;
}

export default function MovieHeroSection({
    movie,
    onWatchNow,
    onAddToList,
}: MovieHeroSectionProps) {
    return (
        <MovieHeroBanner
            movie={movie}
            onWatchNow={onWatchNow}
            onAddToList={onAddToList}
        />
    );
}
