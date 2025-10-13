import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Film, Calendar, Clock, Star, Users, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMediaQuery, useDeleteMedia } from '@/hooks/useAdminMock';
import { Pagination, SearchBox, LoadingSpinner, ConfirmDialog } from '@/components/admin';
import type { Media } from '@/types/admin';

export default function MediaList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [deletingMedia, setDeletingMedia] = useState<Media | null>(null);

    const pageSize = 10;

    // Queries and Mutations
    const { data: mediaData, isLoading } = useMediaQuery({
        page: currentPage,
        pageSize,
        search
    });

    const deleteMutation = useDeleteMedia();

    // Handlers
    const handleDeleteMedia = async () => {
        if (!deletingMedia) return;

        try {
            await deleteMutation.mutateAsync(deletingMedia.id);
            setDeletingMedia(null);
        } catch (error) {
            console.error('Delete media error:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <LoadingSpinner size={32} text="Đang tải danh sách media..." />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Film className="text-red-500" size={28} />
                            Quản lý Media
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Tổng cộng: {mediaData?.totalItems || 0} media
                        </p>
                    </div>

                    <Link to="/admin/media/create">
                        <motion.button
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Plus size={18} />
                            Tạo Media
                        </motion.button>
                    </Link>
                </div>

                {/* Search */}
                <div className="mt-4">
                    <SearchBox
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm media..."
                        className="max-w-md"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    {mediaData?.items.length === 0 ? (
                        <div className="text-center py-12">
                            <Film size={48} className="text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-400 mb-2">
                                {search ? 'Không tìm thấy media nào' : 'Chưa có media nào'}
                            </h3>
                            <p className="text-zinc-500">
                                {search ? 'Hãy thử từ khóa khác' : 'Tạo media đầu tiên của bạn'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {mediaData?.items.map((media) => (
                                <MediaCard
                                    key={media.id}
                                    media={media}
                                    onDelete={setDeletingMedia}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {mediaData && mediaData.totalPages > 1 && (
                <div className="flex-shrink-0 p-6 border-t border-zinc-800">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={mediaData.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deletingMedia}
                onClose={() => setDeletingMedia(null)}
                onConfirm={handleDeleteMedia}
                loading={deleteMutation.isPending}
                title="Xóa Media"
                message={`Bạn có chắc chắn muốn xóa "${deletingMedia?.title}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                type="danger"
            />
        </div>
    );
}

// Media Card Component
interface MediaCardProps {
    media: Media;
    onDelete: (media: Media) => void;
}

function MediaCard({ media, onDelete }: MediaCardProps) {
    const formatDuration = (duration: string) => {
        // Convert TimeSpan string to readable format
        const parts = duration.split(':');
        if (parts.length >= 3) {
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]);
            return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }
        return duration;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
        >
            {/* Cover Image */}
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                {media.coverImageUrl ? (
                    <img
                        src={media.coverImageUrl}
                        alt={media.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Film size={48} className="text-zinc-600" />
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-medium text-white mb-1 line-clamp-1">{media.title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-2">{media.description}</p>

                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-2">
                            <span className="flex items-center gap-1">
                                <Star size={12} />
                                T{media.ageRating}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {formatDuration(media.totalDuration)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(media.releaseDate)}
                            </span>
                        </div>

                        <div className="text-xs text-zinc-500">{media.country}</div>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                        <Link to={`/admin/media/edit/${media.id}`}>
                            <motion.button
                                className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Edit size={16} />
                            </motion.button>
                        </Link>
                        <motion.button
                            onClick={() => onDelete(media)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Trash2 size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Categories */}
                {media.categories.length > 0 && (
                    <div className="mb-2">
                        <div className="flex items-center gap-1 mb-1">
                            <Tag size={12} className="text-zinc-500" />
                            <span className="text-xs text-zinc-500">Thể loại:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {media.categories.slice(0, 3).map((category) => (
                                <span
                                    key={category.id}
                                    className="px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded"
                                >
                                    {category.name}
                                </span>
                            ))}
                            {media.categories.length > 3 && (
                                <span className="px-2 py-1 bg-zinc-800 text-xs text-zinc-400 rounded">
                                    +{media.categories.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* People */}
                {media.people.length > 0 && (
                    <div className="mb-2">
                        <div className="flex items-center gap-1 mb-1">
                            <Users size={12} className="text-zinc-500" />
                            <span className="text-xs text-zinc-500">Diễn viên:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {media.people.slice(0, 2).map((person) => (
                                <span
                                    key={person.id}
                                    className="px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded"
                                >
                                    {person.fullName}
                                </span>
                            ))}
                            {media.people.length > 2 && (
                                <span className="px-2 py-1 bg-zinc-800 text-xs text-zinc-400 rounded">
                                    +{media.people.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Episodes count */}
                {media.episodes.length > 0 && (
                    <div className="text-xs text-zinc-500">
                        {media.episodes.length} tập
                    </div>
                )}
            </div>
        </motion.div>
    );
}