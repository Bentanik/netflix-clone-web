import { useNavigate } from 'react-router-dom';
import {
    HeroBannerSection,
    ForYouSection,
    ContinueWatchingSection,
} from './components';

/**
 * Home Page
 * Trang chủ của ứng dụng Netflix Clone
 */
export default function HomePage() {
    const navigate = useNavigate();

    // Event handlers for Hero Banner
    const handleWatchNow = (slideId: number) => {
        navigate(`/watch/${slideId}`);
    };

    const handleAddToList = (slideId: number) => {
        console.log('Add to list clicked for slide:', slideId);
        // TODO: Implement add to list logic
    };

    // Event handlers for Movie Rows
    const handleMoviePlay = (movieId: number) => {
        navigate(`/watch/${movieId}`);
    };

    const handleMovieInfo = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="bg-[#00000] pb-10 min-h-screen">
            {/* Hero Banner Section */}
            <HeroBannerSection
                onWatchNow={handleWatchNow}
                onAddToList={handleAddToList}
            />

            {/* Movie Rows Section */}
            <div className="relative mt-10 z-10">
                <ForYouSection
                    onPlay={handleMoviePlay}
                    onInfo={handleMovieInfo}
                />
                <ContinueWatchingSection
                    onPlay={handleMoviePlay}
                    onInfo={handleMovieInfo}
                />
            </div>
        </div>
    );
}