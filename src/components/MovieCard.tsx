import { Heart, Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMovieStore } from '@/stores/zustand/useMovieStore';

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  duration?: string;
  seasons?: string;
  match?: number;
  genres?: string[];
  description?: string;
  episode?: number;
  onPlay?: () => void;
  onInfo?: () => void;
}

export default function MovieCard({
  id,
  title,
  image,
  description,
  episode,
  onPlay,
  onInfo
}: MovieCardProps) {
  const { addToMyList, removeFromMyList, isInMyList } = useMovieStore();
  const inMyList = isInMyList(id);

  const handleToggleMyList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inMyList) {
      removeFromMyList(id);
    } else {
      addToMyList({ id, title, image, description, episode });
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900 shadow-xl">
        {/* Movie Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

        {/* Episode Number - Top Left */}
        {episode && (
          <motion.div
            className="absolute top-2 left-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
              <p className="text-white/90 text-[10px] font-semibold tracking-wide">
                EP {episode}
              </p>
            </div>
          </motion.div>
        )}

        {/* Add to List Button - Top Right */}
        <motion.button
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm border transition-all ${inMyList
            ? 'bg-red-600 border-red-600 text-white'
            : 'bg-black/50 border-white/40 text-white hover:bg-black/70 hover:border-white'
            }`}
          onClick={handleToggleMyList}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-all ${inMyList ? 'fill-white' : ''}`}
            strokeWidth={2.5}
          />
        </motion.button>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Title */}
          <motion.h3
            className="text-white font-bold text-lg mb-3 line-clamp-2 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {title}
          </motion.h3>

          {/* Action buttons - visible on hover */}
          <motion.div
            className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black text-sm font-bold py-2.5 px-4 rounded-md transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Phát</span>
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onInfo?.();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700/90 hover:bg-gray-600 text-white text-sm font-semibold py-2.5 px-4 rounded-md transition-all shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Info className="w-4 h-4" />
              <span>Thông tin</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
