import { useState, useEffect } from 'react';
import type { HeroBannerProps } from '@/types/hero';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import SlideIndicators from './SlideIndicators';
import VideoControls from './VideoControls';

export default function HeroBanner({
  slides,
  onWatchNow,
  onAddToList
}: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const slide = slides[currentSlide];

  // Reset video when changing slides
  useEffect(() => {
    setIsVideoPlaying(false);
    setShowControls(true);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (!isVideoPlaying) {
      setShowControls(false);
    } else {
      setShowControls(true);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setShowControls(true);
  };

  const handleMouseEnter = () => {
    if (isVideoPlaying) {
      setShowControls(true);
    }
  };

  const handleMouseLeave = () => {
    if (isVideoPlaying) {
      setShowControls(false);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      <HeroBackground
        isVideoPlaying={isVideoPlaying}
        videoSrc="video.mp4"
        imageSrc={slide.image}
        title={slide.title}
        showOverlay={!isVideoPlaying || showControls}
        onVideoEnd={handleVideoEnd}
      />

      {/* Bottom Container - Content & Indicators nằm ngang */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 px-16">
        <div className="flex items-end justify-between">
          {/* Content - Left Side */}
          <HeroContent
            slide={slide}
            isVisible={!isVideoPlaying || showControls}
            onWatchNow={onWatchNow}
            onAddToList={onAddToList}
          />

          {/* Slide Indicators - Right Side */}
          <SlideIndicators
            totalSlides={slides.length}
            currentSlide={currentSlide}
            isVisible={!isVideoPlaying || showControls}
            onSlideChange={setCurrentSlide}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* Video Controls - Above indicators with 8px gap */}
      <VideoControls
        isVideoPlaying={isVideoPlaying}
        ageRating="T13"
        isVisible={!isVideoPlaying || showControls}
        onToggleVideo={toggleVideo}
      />
    </div>
  );
}

