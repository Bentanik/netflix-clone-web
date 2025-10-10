import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
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
      image: '/images/thumnail.jpg',
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
      image: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWYtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      rating: 6.9,
      year: 2015,
      duration: '2h 4m',
      match: 98,
    },
    {
      id: 2,
      title: 'The King',
      image: 'https://m.media-amazon.com/images/M/MV5BYmIzYzhjNTAtOWUwNy00NTc1LWI0MTgtN2Y3MjNmNTU5Mzc3XkEyXkFqcGc@._V1_.jpg',
      rating: 7.3,
      year: 2019,
      duration: '2h 20m',
      match: 93,
    },
    {
      id: 3,
      title: 'Inside Job',
      image: 'https://m.media-amazon.com/images/M/MV5BNDJkNmRhODEtMTMxMC00OTA1LWI0MDYtNjk0ZWJjYjU5ZjQ5XkEyXkFqcGc@._V1_.jpg',
      rating: 7.7,
      year: 2022,
      seasons: '2 seasons',
      match: 95,
    },
    {
      id: 4,
      title: 'Mindhunter',
      image: 'https://m.media-amazon.com/images/M/MV5BYmJmM2Q1NTAtMzNmYy00MzBkLWJiNTUtY2Q5ZjUzNWRiOTk3XkEyXkFqcGc@._V1_.jpg',
      rating: 8.6,
      year: 2019,
      seasons: '2 seasons',
      match: 98,
    },
    {
      id: 5,
      title: 'Wednesday',
      image: 'https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGc@._V1_.jpg',
      rating: 8.1,
      year: 2022,
      seasons: '1 season',
      match: 91,
    },
  ];

  const continueWatching = [
    {
      id: 6,
      title: 'Breaking Bad',
      image: 'https://m.media-amazon.com/images/M/MV5BYTJkN2FlN2QtOGY1ZC00ZjE5LWIxNzQtN2VmODZkNDZmODBhXkEyXkFqcGc@._V1_.jpg',
      rating: 9.5,
      year: 2008,
      seasons: '5 seasons',
      match: 99,
    },
    {
      id: 7,
      title: 'Stranger Things',
      image: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGc@._V1_.jpg',
      rating: 8.7,
      year: 2016,
      seasons: '4 seasons',
      match: 97,
    },
    {
      id: 8,
      title: 'The Witcher',
      image: 'https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTlkOGEtOTgwZmEwMzAxMzA3XkEyXkFqcGc@._V1_.jpg',
      rating: 8.0,
      year: 2019,
      seasons: '3 seasons',
      match: 94,
    },
    {
      id: 9,
      title: 'Money Heist',
      image: 'https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGc@._V1_.jpg',
      rating: 8.2,
      year: 2017,
      seasons: '5 seasons',
      match: 96,
    },
    {
      id: 10,
      title: 'The Crown',
      image: 'https://m.media-amazon.com/images/M/MV5BY2U5NGMzYTgtZTdkMC00M2ZhLWJkZjYtMjZlYmJlNzBjMjAyXkEyXkFqcGc@._V1_.jpg',
      rating: 8.6,
      year: 2016,
      seasons: '6 seasons',
      match: 92,
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

  return (
    <div className="bg-[#00000] pb-10 min-h-screen">
      <HeroBanner 
        slides={heroSlides}
        autoPlayInterval={6000}
        onWatchNow={handleWatchNow}
        onAddToList={handleAddToList}
      />
      <div className="relative mt-10 z-10">
        <MovieRow title="For you" movies={forYouMovies} />
        <MovieRow title="Continue Watching" movies={continueWatching} />
      </div>
    </div>
  );
}
