import { useState } from 'react';
import type { HeroSlide } from '@/types/hero';
import HeroBackground from '@/components/layout/HeroBackground';
import HeroContent from '@/components/layout/HeroContent';
import VideoControls from '@/components/widget/VideoControls';

interface MovieHeroBannerProps {
    movie: HeroSlide;
    onWatchNow?: (movieId: number) => void;
    onAddToList?: (movieId: number) => void;
    onBack?: () => void;
}

/**
 * Movie Hero Banner Component
 * Single movie hero banner for detail pages (no slides)
 * Reuses HeroBackground, HeroContent, and VideoControls
 */
export default function MovieHeroBanner({
    movie,
    onWatchNow,
    onAddToList,
    onBack
}: MovieHeroBannerProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);

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
            className="relative h-[85vh] w-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background */}
            <HeroBackground
                isVideoPlaying={isVideoPlaying}
                videoSrc={movie.video || ''}
                imageSrc={movie.image}
                title={movie.title}
                showOverlay={!isVideoPlaying || showControls}
                onVideoEnd={handleVideoEnd}
            />

            {/* Back Button */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                </button>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 px-16">
                <HeroContent
                    slide={movie}
                    isVisible={!isVideoPlaying || showControls}
                    onWatchNow={onWatchNow}
                    onAddToList={onAddToList}
                />
            </div>

            {/* Video Controls */}
            <VideoControls
                isVideoPlaying={isVideoPlaying}
                ageRating="T13"
                isVisible={!isVideoPlaying || showControls}
                onToggleVideo={toggleVideo}
            />
        </div>
    );
}
