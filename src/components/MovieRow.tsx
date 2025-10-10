import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  duration?: string;
  seasons?: string;
  match: number;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="px-12 mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-medium text-white">{title}</h2>
        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
          Explore All
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
