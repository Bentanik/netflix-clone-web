import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface VideoControlsProps {
  isVideoPlaying: boolean;
  ageRating?: string;
  isVisible: boolean;
  onToggleVideo: () => void;
}

export default function VideoControls({
  ageRating = 'T13',
  isVisible,
  onToggleVideo
}: VideoControlsProps) {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggle = () => {
    setIsMuted(!isMuted);
    onToggleVideo();
  };

  return (
    <>
      {/* Video Toggle Button - 8px above slide indicators */}
      <motion.button
        onClick={handleToggle}
        className="absolute bottom-[calc(2rem+60px)] right-16 p-3 rounded-full border-2 border-white/50 hover:border-white transition-colors bg-black/50 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon với opacity crossfade - không có scale */}
        <div className="relative w-5 h-5">
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isMuted ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
          >
            <VolumeX size={20} className="text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isMuted ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
          >
            <Volume2 size={20} className="text-white" />
          </motion.div>
        </div>
      </motion.button>

      {/* Age Rating */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute top-24 right-16 px-4 py-2 border-2 border-white/50 text-white text-base font-bold bg-black/50 z-20 rounded ${!isVisible ? 'pointer-events-none' : ''
          }`}
      >
        {ageRating}
      </motion.div>
    </>
  );
}
