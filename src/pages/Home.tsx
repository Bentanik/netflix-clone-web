import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import AuthDemo from '@/components/AuthDemo';
import type { HeroSlide } from '@/types/hero';

export default function Home() {
  // Hero slides data
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'ARCANE',
      subtitle: 'LEAGUE OF LEGENDS',
      description: 'An aspiring utopian regime clashes with a violent radical underground. At the heart of this revolution of magic and tech, a family\'s bond is tested.',
      rating: 9.0,
      year: 2021,
      episodes: 9,
      match: 100,
      genres: ['Animation', 'Action', 'Adventure'],
      image: 'thumnail.jpg',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Replace with actual video
      badge: 'Series',
    },
    {
      id: 2,
      title: 'STRANGER THINGS',
      subtitle: '',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      rating: 8.7,
      year: 2016,
      seasons: 4,
      match: 97,
      genres: ['Sci-Fi', 'Horror', 'Drama'],
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&q=80',
      badge: 'Series',
    },
    {
      id: 3,
      title: 'THE WITCHER',
      subtitle: '',
      description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
      rating: 8.0,
      year: 2019,
      seasons: 3,
      match: 94,
      genres: ['Fantasy', 'Action', 'Adventure'],
      image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1920&q=80',
      badge: 'Series',
    },
  ];

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

  const continueWatching = [
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

  const handleWatchNow = (slideId: number) => {
    console.log('Watch now clicked for slide:', slideId);
    // Implement watch logic
  };

  const handleAddToList = (slideId: number) => {
    console.log('Add to list clicked for slide:', slideId);
    // Implement add to list logic
  };

  const handleMoviePlay = (movieId: number) => {
    console.log('Play movie:', movieId);
    // Implement movie play logic
  };

  const handleMovieInfo = (movieId: number) => {
    console.log('Show movie info:', movieId);
    // Implement movie info/detail modal logic
  };

  return (
    <div className="bg-[#00000] pb-10 min-h-screen">
      <HeroBanner
        slides={heroSlides}
        autoPlayInterval={6000}
        onWatchNow={handleWatchNow}
        onAddToList={handleAddToList}
      />
      <div className="relative mt-10 z-10">
        <MovieRow
          title="For you"
          movies={forYouMovies}
          onPlay={handleMoviePlay}
          onInfo={handleMovieInfo}
        />
        <MovieRow
          title="Continue Watching"
          movies={continueWatching}
          onPlay={handleMoviePlay}
          onInfo={handleMovieInfo}
        />
      </div>

      {/* Demo Auth Modal Button */}
      <AuthDemo />
    </div>
  );
}
