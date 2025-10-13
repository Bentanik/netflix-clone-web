import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Plus, Trash2, Save } from 'lucide-react';
import { CustomButton } from '@/components/ui';
import type { Media, Category, Person, CreateMediaRequest } from '@/types/admin';

interface EpisodeFormData {
    title: string;
    description: string;
    duration: string;
    episodeNumber: number;
    videoUrl: string;
    thumbnailUrl: string;
}

interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (mediaData: Partial<CreateMediaRequest> & { episodes?: EpisodeFormData[] }) => Promise<void>;
    media?: Media;
    categories: Category[];
    people: Person[];
    isLoading?: boolean;
}

export default function MediaModal({
    isOpen,
    onClose,
    onSubmit,
    media,
    categories,
    people,
    isLoading = false
}: MediaModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        releaseDate: '',
        ageRating: 13,
        country: '',
        coverImageUrl: '',
        totalDuration: '00:00:00',
        categoryIds: [] as string[],
        personIds: [] as string[]
    });

    const [episodes, setEpisodes] = useState<EpisodeFormData[]>([]);

    useEffect(() => {
        if (media) {
            setFormData({
                title: media.title,
                description: media.description,
                releaseDate: media.releaseDate.split('T')[0],
                ageRating: media.ageRating,
                country: media.country,
                coverImageUrl: media.coverImageUrl || '',
                totalDuration: media.totalDuration,
                categoryIds: media.categories.map(c => c.id),
                personIds: media.people.map(p => p.id)
            });
            setEpisodes(media.episodes?.map(ep => ({
                title: ep.title,
                description: ep.description,
                duration: ep.duration,
                episodeNumber: ep.episodeNumber,
                videoUrl: ep.videoUrl,
                thumbnailUrl: ep.thumbnailUrl
            })) || []);
        } else {
            setFormData({
                title: '',
                description: '',
                releaseDate: '',
                ageRating: 13,
                country: '',
                coverImageUrl: '',
                totalDuration: '00:00:00',
                categoryIds: [],
                personIds: []
            });
            setEpisodes([]);
        }
    }, [media, isOpen]);

    const handleInputChange = (field: string, value: string | number | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        try {
            const submitData = {
                ...formData,
                episodes: episodes.filter(ep => ep.title?.trim())
            };
            await onSubmit(submitData);
            onClose();
        } catch (error) {
            console.error('Error submitting media:', error);
        }
    };

    const addEpisode = () => {
        setEpisodes(prev => [
            ...prev,
            {
                title: '',
                description: '',
                duration: '00:00:00',
                episodeNumber: prev.length + 1,
                videoUrl: '',
                thumbnailUrl: ''
            }
        ]);
    };

    const updateEpisode = (index: number, field: keyof EpisodeFormData, value: string | number) => {
        setEpisodes(prev => prev.map((ep, i) =>
            i === index ? { ...ep, [field]: value } : ep
        ));
    };

    const removeEpisode = (index: number) => {
        setEpisodes(prev => prev.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                        <div className="flex items-center gap-3">
                            <Film size={24} className="text-red-500" />
                            <h2 className="text-xl font-semibold text-white">
                                {media ? 'Chỉnh sửa Media' : 'Tạo Media mới'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                            disabled={isLoading}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Tiêu đề *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                    placeholder="Nhập tiêu đề media"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Quốc gia
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                    placeholder="Nhập quốc gia"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Ngày phát hành
                                </label>
                                <input
                                    type="date"
                                    value={formData.releaseDate}
                                    onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Độ tuổi
                                </label>
                                <select
                                    value={formData.ageRating}
                                    onChange={(e) => handleInputChange('ageRating', parseInt(e.target.value))}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                >
                                    <option value={13}>T13</option>
                                    <option value={16}>T16</option>
                                    <option value={18}>T18</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Tổng thời lượng
                                </label>
                                <input
                                    type="text"
                                    value={formData.totalDuration}
                                    onChange={(e) => handleInputChange('totalDuration', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                    placeholder="HH:MM:SS"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Mô tả
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows={3}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                placeholder="Nhập mô tả media"
                            />
                        </div>

                        {/* URLs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Cover Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.coverImageUrl}
                                    onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                    placeholder="https://example.com/cover.jpg"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Thể loại
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.categoryIds.includes(category.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleInputChange('categoryIds', [...formData.categoryIds, category.id]);
                                                } else {
                                                    handleInputChange('categoryIds', formData.categoryIds.filter(id => id !== category.id));
                                                }
                                            }}
                                            className="rounded border-zinc-700 text-red-500 focus:ring-red-500"
                                        />
                                        <span className="text-zinc-300">{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* People */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Diễn viên / Đạo diễn
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                                {people.map((person) => (
                                    <label key={person.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.personIds.includes(person.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleInputChange('personIds', [...formData.personIds, person.id]);
                                                } else {
                                                    handleInputChange('personIds', formData.personIds.filter(id => id !== person.id));
                                                }
                                            }}
                                            className="rounded border-zinc-700 text-red-500 focus:ring-red-500"
                                        />
                                        <span className="text-zinc-300">{person.fullName}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Episodes */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-medium text-zinc-300">
                                    Tập phim ({episodes.length})
                                </label>
                                <CustomButton
                                    type="button"
                                    onClick={addEpisode}
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Thêm tập
                                </CustomButton>
                            </div>

                            {episodes.length > 0 && (
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {episodes.map((episode, index) => (
                                        <div key={index} className="bg-zinc-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-zinc-300">
                                                    Tập {episode.episodeNumber}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeEpisode(index)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={episode.title || ''}
                                                    onChange={(e) => updateEpisode(index, 'title', e.target.value)}
                                                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                                                    placeholder="Tiêu đề tập"
                                                />
                                                <input
                                                    type="text"
                                                    value={episode.duration || ''}
                                                    onChange={(e) => updateEpisode(index, 'duration', e.target.value)}
                                                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                                                    placeholder="Thời lượng (HH:MM:SS)"
                                                />
                                                <input
                                                    type="url"
                                                    value={episode.videoUrl || ''}
                                                    onChange={(e) => updateEpisode(index, 'videoUrl', e.target.value)}
                                                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                                                    placeholder="Video URL"
                                                />
                                                <input
                                                    type="url"
                                                    value={episode.thumbnailUrl || ''}
                                                    onChange={(e) => updateEpisode(index, 'thumbnailUrl', e.target.value)}
                                                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                                                    placeholder="Thumbnail URL"
                                                />
                                            </div>

                                            <textarea
                                                value={episode.description || ''}
                                                onChange={(e) => updateEpisode(index, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full mt-3 bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                                                placeholder="Mô tả tập phim"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                            <CustomButton
                                type="button"
                                onClick={onClose}
                                variant="ghost"
                                disabled={isLoading}
                            >
                                Hủy
                            </CustomButton>
                            <CustomButton
                                type="submit"
                                isLoading={isLoading}
                                className="flex items-center gap-2"
                            >
                                <Save size={16} />
                                {media ? 'Cập nhật' : 'Tạo mới'}
                            </CustomButton>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}