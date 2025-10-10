import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useMovieStore } from '@/stores/zustand/useMovieStore';
import { MovieCard } from '@/components';

export default function MyList() {
    const { myList } = useMovieStore();

    const handleMoviePlay = (movieId: number) => {
        console.log('Playing movie:', movieId);
        // TODO: Navigate to player
    };

    const handleMovieInfo = (movieId: number) => {
        console.log('Show info for movie:', movieId);
        // TODO: Show movie detail modal
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-16">
            <div className="px-12">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                        <h1 className="text-4xl font-bold text-white">Danh sách của tôi</h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        {myList.length === 0
                            ? 'Chưa có phim nào trong danh sách'
                            : `${myList.length} phim đã lưu`}
                    </p>
                </motion.div>

                {/* Movies Grid */}
                {myList.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {myList.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                {...movie}
                                onPlay={() => handleMoviePlay(movie.id)}
                                onInfo={() => handleMovieInfo(movie.id)}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-full p-8 mb-6">
                            <Heart className="w-16 h-16 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">
                            Danh sách trống
                        </h3>
                        <p className="text-gray-400 text-center max-w-md">
                            Thêm phim vào danh sách của bạn bằng cách nhấn vào nút <span className="text-white">+</span> trên các phim yêu thích
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
