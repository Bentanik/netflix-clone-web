import { motion } from 'framer-motion';
import type { HeroSlide } from '@/types/hero';

interface HeroContentProps {
  slide: HeroSlide;
  isVisible: boolean;
  onWatchNow?: (id: number) => void;
  onAddToList?: (id: number) => void;
}

export default function HeroContent({ slide, isVisible, onWatchNow, onAddToList }: HeroContentProps) {
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="max-w-3xl"
    >
      {/* Badge */}
      {slide.badge && (
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-red-600 text-xl font-bold">N</span>
          <span className="text-gray-300 text-xs tracking-[0.3em] uppercase">{slide.badge}</span>
        </motion.div>
      )}

      {/* Title */}
      <motion.div 
        variants={itemVariants}
        className="mb-5"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-1 tracking-wider uppercase" style={{ 
          color: '#ffffff',
          textShadow: '3px 3px 6px rgba(0,0,0,0.8)'
        }}>
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-lg tracking-[0.15em] font-medium uppercase" style={{ 
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Tags */}
      <motion.div 
        variants={itemVariants}
        className="flex gap-3 text-sm text-white mb-4"
      >
        {slide.genres.map((genre, index) => (
          <span key={genre}>
            {genre}
            {index < slide.genres.length - 1 && <span className="mx-2">·</span>}
          </span>
        ))}
      </motion.div>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-white text-base mb-6 leading-relaxed line-clamp-2 max-w-2xl"
      >
        {slide.description}
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-4"
      >
        <motion.button 
          onClick={() => onWatchNow?.(slide.id)}
          className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-semibold text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Xem ngay
        </motion.button>
        <motion.button 
          onClick={() => onAddToList?.(slide.id)}
          className="flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-3 rounded hover:bg-white/20 transition-colors font-semibold text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Chi tiết
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
