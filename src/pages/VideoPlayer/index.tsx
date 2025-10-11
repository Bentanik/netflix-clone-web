import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    ChevronLeft,
    ChevronRight,
    X,
    Settings,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const VideoPlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const episodeId = searchParams.get('episode');

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showEpisodes, setShowEpisodes] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [quality, setQuality] = useState('1080p');

    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<number | undefined>(undefined);

    // Mock data
    const currentEpisode = {
        id: episodeId || '1',
        number: 1,
        title: 'Chapter One: The Vanishing of Will Byers',
        duration: '48:23',
        thumbnail: 'https://images.unsplash.com/photo-1574267432644-f74f8c95df9f?w=300&h=170&fit=crop',
    };

    const episodes = [
        {
            id: 1,
            number: 1,
            title: 'Chapter One: The Vanishing of Will Byers',
            duration: '48m',
            thumbnail: 'https://images.unsplash.com/photo-1574267432644-f74f8c95df9f?w=300&h=170&fit=crop',
            watched: true,
        },
        {
            id: 2,
            number: 2,
            title: 'Chapter Two: The Weirdo on Maple Street',
            duration: '55m',
            thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=170&fit=crop',
            watched: false,
        },
        {
            id: 3,
            number: 3,
            title: 'Chapter Three: Holly, Jolly',
            duration: '51m',
            thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=170&fit=crop',
            watched: false,
        },
    ];

    const nextEpisode = episodes.find((ep) => ep.id === (parseInt(episodeId || '1') + 1));

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying((prev) => !prev);
            } else if (e.code === 'ArrowLeft') {
                setCurrentTime((prev) => Math.max(0, prev - 10));
            } else if (e.code === 'ArrowRight') {
                setCurrentTime((prev) => Math.min(duration, prev + 10));
            } else if (e.code === 'KeyM') {
                setIsMuted((prev) => !prev);
            } else if (e.code === 'KeyF') {
                if (!document.fullscreenElement) {
                    playerRef.current?.requestFullscreen();
                    setIsFullscreen(true);
                } else {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [duration]);

    useEffect(() => {
        if (showControls) {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false);
                }
            }, 3000);
        }
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [showControls, isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const skipBackward = () => {
        setCurrentTime(Math.max(0, currentTime - 10));
    };

    const skipForward = () => {
        setCurrentTime(Math.min(duration, currentTime + 10));
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setCurrentTime(percent * duration);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
    };

    const handleEpisodeSelect = (epId: number) => {
        navigate(`/watch/${id}?episode=${epId}`);
        setShowEpisodes(false);
    };

    const handleGoBack = () => {
        navigate(`/movie/${id}`);
    };

    // Mock duration for demo
    useEffect(() => {
        setDuration(2903); // 48:23
    }, []);

    // Simulate playback
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, duration]);

    return (
        <div
            ref={playerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-black overflow-hidden"
        >
            {/* Video Element */}
            <div className="absolute inset-0 flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop"
                >
                    <source src="your-video-url.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Click to Play/Pause */}
            <div
                onClick={togglePlay}
                className="absolute inset-0 z-10 cursor-pointer"
            />

            {/* Controls Overlay */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-20 pointer-events-none"
                    >
                        {/* Top Bar */}
                        <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleGoBack}
                                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                    <span className="text-lg font-semibold">Back to Browse</span>
                                </button>
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">Stranger Things</h2>
                                    <p className="text-sm text-white/70">S1:E{currentEpisode.number} - {currentEpisode.title}</p>
                                </div>
                                <div className="w-40" /> {/* Spacer for balance */}
                            </div>
                        </div>

                        {/* Center Play/Pause Button */}
                        {!isPlaying && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <button
                                    onClick={togglePlay}
                                    className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all pointer-events-auto"
                                >
                                    <Play className="w-12 h-12 text-white fill-white ml-2" />
                                </button>
                            </motion.div>
                        )}

                        {/* Bottom Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
                            {/* Progress Bar */}
                            <div
                                onClick={handleProgressClick}
                                className="mb-6 h-1 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all group"
                            >
                                <motion.div
                                    className="h-full bg-red-600 rounded-full relative"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    {/* Play/Pause */}
                                    <button
                                        onClick={togglePlay}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-10 h-10" />
                                        ) : (
                                            <Play className="w-10 h-10 fill-white" />
                                        )}
                                    </button>

                                    {/* Skip Back */}
                                    <button
                                        onClick={skipBackward}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        <SkipBack className="w-8 h-8" />
                                    </button>

                                    {/* Skip Forward */}
                                    <button
                                        onClick={skipForward}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        <SkipForward className="w-8 h-8" />
                                    </button>

                                    {/* Volume */}
                                    <div className="flex items-center gap-3 group">
                                        <button
                                            onClick={toggleMute}
                                            className="text-white hover:text-white/80 transition-colors"
                                        >
                                            {isMuted || volume === 0 ? (
                                                <VolumeX className="w-8 h-8" />
                                            ) : (
                                                <Volume2 className="w-8 h-8" />
                                            )}
                                        </button>
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            whileHover={{ width: 100, opacity: 1 }}
                                            className="h-1 bg-white/30 rounded-full overflow-hidden"
                                        >
                                            <div
                                                className="h-full bg-white rounded-full"
                                                style={{ width: `${volume}%` }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Time */}
                                    <span className="text-white text-sm font-medium">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Next Episode */}
                                    {nextEpisode && (
                                        <button
                                            onClick={() => handleEpisodeSelect(nextEpisode.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-all text-white"
                                        >
                                            <span className="text-sm font-medium">Next Episode</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    )}

                                    {/* Episodes List */}
                                    <button
                                        onClick={() => setShowEpisodes(!showEpisodes)}
                                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-all text-white text-sm font-medium"
                                    >
                                        Episodes
                                    </button>

                                    {/* Settings */}
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        <Settings className="w-7 h-7" />
                                    </button>

                                    {/* Fullscreen */}
                                    <button
                                        onClick={toggleFullscreen}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        {isFullscreen ? (
                                            <Minimize className="w-7 h-7" />
                                        ) : (
                                            <Maximize className="w-7 h-7" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Episodes Sidebar */}
            <AnimatePresence>
                {showEpisodes && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="absolute top-0 right-0 bottom-0 w-96 bg-black/95 backdrop-blur-lg z-30 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                                <button
                                    onClick={() => setShowEpisodes(false)}
                                    className="text-white hover:text-white/80 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {episodes.map((episode) => (
                                    <motion.div
                                        key={episode.id}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleEpisodeSelect(episode.id)}
                                        className={`relative cursor-pointer rounded-lg overflow-hidden ${episode.id === parseInt(episodeId || '1')
                                            ? 'ring-2 ring-red-600'
                                            : ''
                                            }`}
                                    >
                                        <img
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            className="w-full h-24 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
                                            <h3 className="text-white font-semibold text-sm mb-1">
                                                {episode.number}. {episode.title}
                                            </h3>
                                            <p className="text-white/70 text-xs">{episode.duration}</p>
                                        </div>
                                        {episode.watched && (
                                            <div className="absolute top-2 right-2 px-2 py-1 bg-green-600 text-white text-xs rounded">
                                                Watched
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Menu */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-24 right-8 bg-black/95 backdrop-blur-lg rounded-lg p-4 z-30 min-w-[200px]"
                    >
                        <div className="space-y-2">
                            <h3 className="text-white font-semibold mb-3">Quality</h3>
                            {['Auto', '1080p', '720p', '480p'].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => {
                                        setQuality(q);
                                        setShowSettings(false);
                                    }}
                                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${quality === q
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auto-hide overlay for preventing accidental clicks */}
            {!showControls && isPlaying && (
                <div className="absolute inset-0 z-5" onClick={(e) => e.stopPropagation()} />
            )}
        </div>
    );
};

export default VideoPlayerPage;
