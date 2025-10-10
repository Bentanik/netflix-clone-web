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
    // Event handlers for Hero Banner
    const handleWatchNow = (slideId: number) => {
        console.log('Watch now clicked for slide:', slideId);
        // TODO: Implement watch logic
    };

    const handleAddToList = (slideId: number) => {
        console.log('Add to list clicked for slide:', slideId);
        // TODO: Implement add to list logic
    };

    // Event handlers for Movie Rows
    const handleMoviePlay = (movieId: number) => {
        console.log('Play movie:', movieId);
        // TODO: Implement movie play logic
    };

    const handleMovieInfo = (movieId: number) => {
        console.log('Show movie info:', movieId);
        // TODO: Implement movie info/detail modal logic
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