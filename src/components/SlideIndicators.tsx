import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  isVisible: boolean;
  onSlideChange: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function SlideIndicators({ 
  totalSlides, 
  currentSlide, 
  isVisible,
  onSlideChange,
  onPrev,
  onNext 
}: SlideIndicatorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 flex-shrink-0 ${
        !isVisible ? 'pointer-events-none' : ''
      }`}
    >
      <motion.button
        onClick={onPrev}
        className="p-2 rounded-full border-2 border-white/50 hover:border-white transition-colors bg-black/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={20} className="text-white" />
      </motion.button>
      
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`transition-all duration-300 ${
            index === currentSlide 
              ? 'w-10 h-1 bg-white rounded-full' 
              : 'w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.2 }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
      
      <motion.button
        onClick={onNext}
        className="p-2 rounded-full border-2 border-white/50 hover:border-white transition-colors bg-black/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={20} className="text-white" />
      </motion.button>
    </motion.div>
  );
}
