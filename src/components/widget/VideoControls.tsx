import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoControlsProps {
  isVideoPlaying: boolean;
  ageRating?: string;
  isVisible: boolean;
  onToggleVideo: () => void;
}

export default function VideoControls({ 
  isVideoPlaying, 
  ageRating = 'T13',
  isVisible,
  onToggleVideo 
}: VideoControlsProps) {
  return (
    <>
      {/* Video Toggle Button - 8px above slide indicators */}
      <motion.button 
        onClick={onToggleVideo}
        className="absolute bottom-[calc(2rem+60px)] right-16 p-3 rounded-full border-2 border-white/50 hover:border-white transition-all duration-300 bg-black/50 z-30"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isVideoPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Volume2 size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VolumeX size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Age Rating */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute top-24 right-16 px-4 py-2 border-2 border-white/50 text-white text-base font-bold bg-black/50 z-20 rounded ${
          !isVisible ? 'pointer-events-none' : ''
        }`}
      >
        {ageRating}
      </motion.div>
    </>
  );
}
