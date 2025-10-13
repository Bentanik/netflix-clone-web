import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Save, X, Calendar, Globe, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCategoriesQuery, usePeopleQuery, useCreateMedia } from '@/hooks/useAdminMock';
import { LoadingSpinner } from '@/components/admin';
import type { CreateMediaRequest, CreateEpisodeRequest, Category, Person } from '@/types/admin';

export default function MediaCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateMediaRequest>({
        title: '',
        description: '',
        coverImageId: '',
        ageRating: 13,
        country: '',
        totalDuration: '',
        releaseDate: '',
        categoryIds: [],
        personIds: [],
        episodes: []
    });

    const [episodes, setEpisodes] = useState<CreateEpisodeRequest[]>([]);
    const [isSeriesMode, setIsSeriesMode] = useState(false);

    // Queries
    const { data: categoriesData } = useCategoriesQuery({ page: 1, pageSize: 100 });
    const { data: peopleData } = usePeopleQuery({ page: 1, pageSize: 100 });
    const createMutation = useCreateMedia();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const submitData = {
                ...formData,
                episodes: isSeriesMode ? episodes : undefined
            };

            await createMutation.mutateAsync(submitData);
            navigate('/admin/media');
        } catch (error) {
            console.error('Create media error:', error);
        }
    };

    const addEpisode = () => {
        const newEpisode: CreateEpisodeRequest = {
            title: '',
            episodeNumber: episodes.length + 1,
            description: '',
            duration: '',
            videoId: '',
            thumbnailId: ''
        };
        setEpisodes([...episodes, newEpisode]);
    };

    const removeEpisode = (index: number) => {
        setEpisodes(episodes.filter((_, i) => i !== index));
    };

    const updateEpisode = (index: number, field: keyof CreateEpisodeRequest, value: string | number) => {
        const updatedEpisodes = [...episodes];
        updatedEpisodes[index] = { ...updatedEpisodes[index], [field]: value };
        setEpisodes(updatedEpisodes);
    };

    const toggleCategorySelection = (categoryId: string) => {
        const isSelected = formData.categoryIds.includes(categoryId);
        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                categoryIds: prev.categoryIds.filter(id => id !== categoryId)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                categoryIds: [...prev.categoryIds, categoryId]
            }));
        }
    };

    const togglePersonSelection = (personId: string) => {
        const isSelected = formData.personIds.includes(personId);
        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                personIds: prev.personIds.filter(id => id !== personId)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                personIds: [...prev.personIds, personId]
            }));
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => navigate('/admin/media')}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Tạo Media Mới</h1>
                            <p className="text-zinc-400 mt-1">Thêm phim hoặc bộ phim mới vào thư viện</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">Bộ phim:</span>
                            <motion.button
                                onClick={() => setIsSeriesMode(!isSeriesMode)}
                                className={`relative w-12 h-6 rounded-full transition-colors ${isSeriesMode ? 'bg-red-600' : 'bg-zinc-700'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                                    animate={{ x: isSeriesMode ? 24 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-8">
                    {/* Basic Information */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Thông tin cơ bản</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Tiêu đề *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Nhập tiêu đề..."
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Mô tả *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Nhập mô tả..."
                                    rows={4}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Cover Image ID *
                                </label>
                                <input
                                    type="text"
                                    value={formData.coverImageId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, coverImageId: e.target.value }))}
                                    placeholder="Nhập Cover Image ID..."
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                    <Star size={16} />
                                    Độ tuổi *
                                </label>
                                <select
                                    value={formData.ageRating}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ageRating: Number(e.target.value) }))}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                >
                                    <option value={0}>T0 - Mọi lứa tuổi</option>
                                    <option value={13}>T13 - Từ 13 tuổi</option>
                                    <option value={16}>T16 - Từ 16 tuổi</option>
                                    <option value={18}>T18 - Từ 18 tuổi</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                    <Globe size={16} />
                                    Quốc gia *
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                                    placeholder="Việt Nam"
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                    <Clock size={16} />
                                    Tổng thời lượng *
                                </label>
                                <input
                                    type="text"
                                    value={formData.totalDuration}
                                    onChange={(e) => setFormData(prev => ({ ...prev, totalDuration: e.target.value }))}
                                    placeholder="01:30:00"
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                    <Calendar size={16} />
                                    Ngày phát hành *
                                </label>
                                <input
                                    type="date"
                                    value={formData.releaseDate}
                                    onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Categories Selection */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Thể loại</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {categoriesData?.items.map((category: Category) => (
                                <motion.button
                                    key={category.id}
                                    type="button"
                                    onClick={() => toggleCategorySelection(category.id)}
                                    className={`p-3 rounded-lg border transition-colors text-left ${formData.categoryIds.includes(category.id)
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {category.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* People Selection */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Diễn viên & Đạo diễn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {peopleData?.items.map((person: Person) => (
                                <motion.button
                                    key={person.id}
                                    type="button"
                                    onClick={() => togglePersonSelection(person.id)}
                                    className={`p-3 rounded-lg border transition-colors text-left ${formData.personIds.includes(person.id)
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="font-medium">{person.fullName}</div>
                                    {person.otherName && (
                                        <div className="text-sm opacity-75">({person.otherName})</div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Episodes (if series mode) */}
                    {isSeriesMode && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Tập phim</h3>
                                <motion.button
                                    type="button"
                                    onClick={addEpisode}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Plus size={16} />
                                    Thêm tập
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                {episodes.map((episode, index) => (
                                    <div key={index} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-white">Tập {episode.episodeNumber}</h4>
                                            <motion.button
                                                type="button"
                                                onClick={() => removeEpisode(index)}
                                                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X size={16} />
                                            </motion.button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                                    Tiêu đề
                                                </label>
                                                <input
                                                    type="text"
                                                    value={episode.title}
                                                    onChange={(e) => updateEpisode(index, 'title', e.target.value)}
                                                    placeholder="Tiêu đề tập phim..."
                                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                                    Thời lượng
                                                </label>
                                                <input
                                                    type="text"
                                                    value={episode.duration}
                                                    onChange={(e) => updateEpisode(index, 'duration', e.target.value)}
                                                    placeholder="00:45:00"
                                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                                    Video ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={episode.videoId}
                                                    onChange={(e) => updateEpisode(index, 'videoId', e.target.value)}
                                                    placeholder="Video ID..."
                                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                                    Thumbnail ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={episode.thumbnailId}
                                                    onChange={(e) => updateEpisode(index, 'thumbnailId', e.target.value)}
                                                    placeholder="Thumbnail ID..."
                                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    value={episode.description}
                                                    onChange={(e) => updateEpisode(index, 'description', e.target.value)}
                                                    placeholder="Mô tả tập phim..."
                                                    rows={2}
                                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-zinc-800">
                        <motion.button
                            type="button"
                            onClick={() => navigate('/admin/media')}
                            disabled={createMutation.isPending}
                            className="px-6 py-2 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hủy
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {createMutation.isPending && <LoadingSpinner size={16} />}
                            <Save size={16} />
                            Tạo Media
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
