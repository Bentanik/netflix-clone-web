import { MovieRow } from '@/components';

/**
 * For You Section - Component riêng cho Home page
 * Hiển thị danh sách phim được đề xuất cho user
 */

interface ForYouSectionProps {
    onPlay: (movieId: number) => void;
    onInfo: (movieId: number) => void;
}

export default function ForYouSection({ onPlay, onInfo }: ForYouSectionProps) {
    const forYouMovies = [
        {
            id: 1,
            title: 'Inception',
            image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
            description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people\'s dreams and steal their secrets from their subconscious.',
            rating: 8.8,
            year: 2010,
            duration: '2h 28m',
            match: 100,
            genres: ['Action', 'Adventure', 'Sci-Fi'],
        },
        {
            id: 2,
            title: 'The Dark Knight',
            image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
            description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
            rating: 9.0,
            year: 2008,
            duration: '2h 32m',
            match: 98,
            genres: ['Action', 'Crime', 'Drama'],
        },
        {
            id: 3,
            title: 'Interstellar',
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            rating: 8.6,
            year: 2014,
            duration: '2h 49m',
            match: 95,
            genres: ['Adventure', 'Drama', 'Sci-Fi'],
        },
        {
            id: 4,
            title: 'The Shawshank Redemption',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
            description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            rating: 9.3,
            year: 1994,
            duration: '2h 22m',
            match: 99,
            genres: ['Drama'],
        },
        {
            id: 5,
            title: 'Pulp Fiction',
            image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
            description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
            rating: 8.9,
            year: 1994,
            duration: '2h 34m',
            match: 96,
            genres: ['Crime', 'Drama'],
        },
    ];

    return (
        <MovieRow
            title="For you"
            movies={forYouMovies}
            onPlay={onPlay}
            onInfo={onInfo}
        />
    );
}
