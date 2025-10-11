import { useParams, useNavigate } from 'react-router-dom';
import type { HeroSlide } from '@/types/hero';
import {
    MovieHeroSection,
    EpisodesSection,
    DetailsSection,
    SimilarContentSection,
} from './components';

/**
 * Movie Detail Page
 * Displays detailed information about a movie/series
 */
const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data - convert to HeroSlide format for MovieHeroBanner
    const movieData: HeroSlide = {
        id: parseInt(id || '1'),
        title: 'Stranger Things',
        subtitle: 'Season 4',
        description:
            'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop',
        video: '', // Add video URL if available
        rating: 8.7,
        year: 2016,
        seasons: 4,
        match: 98,
        genres: ['Sci-Fi', 'Horror', 'Drama'],
        badge: 'NEW EPISODES',
    };

    const movieMeta = {
        ageRating: '16+',
        duration: '50m',
        cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour'],
        creators: ['The Duffer Brothers'],
        genres: movieData.genres,
    };

    const episodes = [
        {
            id: 1,
            number: 1,
            title: 'Chapter One: The Vanishing of Will Byers',
            description:
                'On his way home from a friend\'s house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.',
            duration: '48m',
            thumbnail: 'https://images.unsplash.com/photo-1574267432644-f74f8c95df9f?w=300&h=170&fit=crop',
            isWatched: true,
        },
        {
            id: 2,
            number: 2,
            title: 'Chapter Two: The Weirdo on Maple Street',
            description:
                'Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.',
            duration: '55m',
            thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=170&fit=crop',
            isContinueWatching: true,
        },
        {
            id: 3,
            number: 3,
            title: 'Chapter Three: Holly, Jolly',
            description:
                'An increasingly concerned Nancy looks for Barb and finds out what Jonathan\'s been up to. Joyce is convinced Will is trying to talk to her.',
            duration: '51m',
            thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=170&fit=crop',
        },
    ];

    const similarMovies = [
        {
            id: 2,
            title: 'The Witcher',
            image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=450&fit=crop',
            rating: 8.2,
            year: 2019,
            match: 95,
        },
        {
            id: 3,
            title: 'Dark',
            image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop',
            rating: 8.7,
            year: 2017,
            match: 92,
        },
        {
            id: 4,
            title: 'The Umbrella Academy',
            image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=450&fit=crop',
            rating: 8.0,
            year: 2019,
            match: 88,
        },
        {
            id: 5,
            title: 'Black Mirror',
            image: 'https://images.unsplash.com/photo-1574267432644-f74f8c95df9f?w=300&h=450&fit=crop',
            rating: 8.8,
            year: 2011,
            match: 90,
        },
        {
            id: 6,
            title: 'The Crown',
            image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
            rating: 8.6,
            year: 2016,
            match: 85,
        },
    ];

    // Event handlers
    const handlePlayMovie = (movieId: number) => {
        navigate(`/watch/${movieId}`);
    };

    const handleAddToList = (movieId: number) => {
        console.log('Add to list:', movieId);
        // TODO: Implement add to list with Zustand store
    };

    const handlePlayEpisode = (episodeId: number) => {
        navigate(`/watch/${id}?episode=${episodeId}`);
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Hero Section */}
            <MovieHeroSection
                movie={movieData}
                onWatchNow={handlePlayMovie}
                onAddToList={handleAddToList}
            />

            {/* Episodes Section */}
            <EpisodesSection
                episodes={episodes}
                onPlayEpisode={handlePlayEpisode}
            />

            {/* Details Section */}
            <DetailsSection metadata={movieMeta} />

            {/* Similar Content */}
            <SimilarContentSection movies={similarMovies} />
        </div>
    );
};

export default MovieDetailPage;
