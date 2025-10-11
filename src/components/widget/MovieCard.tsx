import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useState, type MouseEvent } from 'react';

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  duration?: string;
  seasons?: string;
  match?: number;
  description?: string;
  genres?: string[];
  onPlay?: () => void;
  onInfo?: () => void;
}

/**
 * MovieCard - Netflix style movie/series card
 * Large card with full details (like Inception in the image)
 */
export default function MovieCard({
  title,
  image,
  rating,
  year,
  duration,
  seasons,
  match,
  description,
  genres,
  onInfo,
}: MovieCardProps) {
  const [isInList, setIsInList] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer bg-zinc-900 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={onInfo}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Title and Add Button */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-bold text-xl flex-1 line-clamp-2 leading-tight">
            {title}
          </h3>
          <motion.button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setIsInList(!isInList);
            }}
            className="ml-2 w-8 h-8 rounded-full border-2 border-zinc-400 flex items-center justify-center flex-shrink-0 hover:border-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isInList ? (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            ) : (
              <Plus className="w-4 h-4 text-zinc-400 group-hover:text-white" strokeWidth={3} />
            )}
          </motion.button>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          {/* IMDb Rating */}
          {rating && (
            <div className="flex items-center gap-1">
              <div className="bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded text-xs">
                IMDb
              </div>
              <span className="text-white font-semibold">{rating}</span>
            </div>
          )}

          {year && <span className="text-zinc-400">{year}</span>}
          {duration && <span className="text-zinc-400">{duration}</span>}
          {seasons && <span className="text-zinc-400">{seasons}</span>}
          {match && <span className="text-green-500 font-semibold">{match}% match</span>}
        </div>

        {/* Description */}
        {description && (
          <p className="text-zinc-400 text-sm mb-3 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Genres */}
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="text-zinc-400 text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
