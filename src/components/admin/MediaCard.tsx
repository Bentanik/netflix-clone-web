import { motion } from 'framer-motion';
import { Edit, Trash2, Film, Calendar, Clock, Star, Users, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Media } from '@/types/admin';

interface MediaCardProps {
    media: Media;
    onDelete: (media: Media) => void;
}

export default function MediaCard({ media, onDelete }: MediaCardProps) {
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