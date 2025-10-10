import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  isVideoPlaying: boolean;
  videoSrc: string;
  imageSrc: string;
  title: string;
  showOverlay: boolean;
  onVideoEnd?: () => void;
}

export default function HeroBackground({
  isVideoPlaying,
  videoSrc,
  imageSrc,
  title,
  showOverlay,
  onVideoEnd
}: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video playback failed:', err);
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVideoPlaying]);

  const handleVideoEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Video/Image */}
      {isVideoPlaying ? (
        <motion.video
          ref={videoRef}
          src={videoSrc}
          className="absolute top-0 left-0 w-full h-full object-cover"
          playsInline
          autoPlay
          muted={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onEnded={handleVideoEnd}
          onError={() => {
            console.error('Video failed to load');
          }}
        />
      ) : (
        <motion.img
          src={imageSrc}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80';
          }}
        />
      )}

      {/* Gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
