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
            title: 'Jurassic World',
            image: '/thumnail.jpg',
            rating: 6.9,
            year: 2015,
            duration: '2h 4m',
            match: 98,
            genres: ['Action', 'Adventure', 'Sci-Fi'],
            description: 'Twenty-two years after the original Jurassic Park failed, the new park is open for business.',
        },
        {
            id: 2,
            title: 'The King',
            image: '/thumnail.jpg',
            rating: 7.3,
            year: 2019,
            duration: '2h 20m',
            match: 93,
            genres: ['Drama', 'History', 'War'],
            description: 'Young Henry V encounters deceit, war and treachery after becoming King of England in the 15th century.',
        },
        {
            id: 3,
            title: 'Inside Job',
            image: '/thumnail.jpg',
            rating: 7.7,
            year: 2022,
            seasons: '2 seasons',
            match: 95,
            genres: ['Comedy', 'Animation', 'Sci-Fi'],
            description: 'For employees of the Deep State, conspiracies aren\'t just theories — they\'re fact.',
        },
        {
            id: 4,
            title: 'Mindhunter',
            image: '/thumnail.jpg',
            rating: 8.6,
            year: 2019,
            seasons: '2 seasons',
            match: 98,
            genres: ['Crime', 'Drama', 'Thriller'],
            description: 'Two FBI agents set out on a sinister investigative odyssey to discover the brutal answers.',
        },
        {
            id: 5,
            title: 'Wednesday',
            image: '/thumnail.jpg',
            rating: 8.1,
            year: 2022,
            seasons: '1 season',
            match: 91,
            genres: ['Comedy', 'Mystery', 'Fantasy'],
            description: 'Wednesday Addams attempts to master her emerging psychic ability while solving a murder mystery.',
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
