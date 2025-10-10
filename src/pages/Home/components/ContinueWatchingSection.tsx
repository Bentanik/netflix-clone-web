import { MovieRow } from '@/components';

/**
 * Continue Watching Section - Component riêng cho Home page
 * Hiển thị danh sách phim đang xem dở
 */

interface ContinueWatchingSectionProps {
    onPlay: (movieId: number) => void;
    onInfo: (movieId: number) => void;
}

export default function ContinueWatchingSection({ onPlay, onInfo }: ContinueWatchingSectionProps) {
    const continueWatchingMovies = [
        {
            id: 6,
            title: 'Breaking Bad',
            image: '/thumnail.jpg',
            rating: 9.5,
            year: 2008,
            seasons: '5 seasons',
            match: 99,
            genres: ['Crime', 'Drama', 'Thriller'],
            description: 'A chemistry teacher diagnosed with cancer turns to cooking meth to secure his family\'s future.',
        },
        {
            id: 7,
            title: 'Stranger Things',
            image: '/thumnail.jpg',
            rating: 8.7,
            year: 2016,
            seasons: '4 seasons',
            match: 97,
            genres: ['Drama', 'Fantasy', 'Horror'],
            description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
        },
        {
            id: 8,
            title: 'The Witcher',
            image: '/thumnail.jpg',
            rating: 8.0,
            year: 2019,
            seasons: '3 seasons',
            match: 94,
            genres: ['Action', 'Adventure', 'Fantasy'],
            description: 'Geralt of Rivia, a monster hunter, struggles to find his place in a world where people prove more wicked.',
        },
        {
            id: 9,
            title: 'Money Heist',
            image: '/thumnail.jpg',
            rating: 8.2,
            year: 2017,
            seasons: '5 seasons',
            match: 96,
            genres: ['Action', 'Crime', 'Mystery'],
            description: 'A criminal mastermind who goes by "The Professor" has a plan to pull off the biggest heist in recorded history.',
        },
        {
            id: 10,
            title: 'The Crown',
            image: '/thumnail.jpg',
            rating: 8.6,
            year: 2016,
            seasons: '6 seasons',
            match: 92,
            genres: ['Drama', 'History'],
            description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
        },
    ];

    return (
        <MovieRow
            title="Continue Watching"
            movies={continueWatchingMovies}
            onPlay={onPlay}
            onInfo={onInfo}
        />
    );
}
