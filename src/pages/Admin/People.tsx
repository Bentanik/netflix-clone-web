import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserPlus } from 'lucide-react';
import { usePeopleQuery, useCreatePerson, useUpdatePerson, useDeletePerson } from '@/hooks/useAdminMock';
import {
    Pagination,
    SearchBox,
    LoadingSpinner,
    ConfirmDialog,
    PersonCard,
    PersonModal
} from '@/components/admin';
import { type Person, type CreatePersonRequest, type UpdatePersonRequest } from '@/types/admin';

export default function People() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPerson, setEditingPerson] = useState<Person | null>(null);
    const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);

    const pageSize = 10;

    // Queries and Mutations
    const { data: peopleData, isLoading } = usePeopleQuery({
        page: currentPage,
        pageSize,
        search
    });

    const createMutation = useCreatePerson();
    const updateMutation = useUpdatePerson();
    const deleteMutation = useDeletePerson();

    // Handlers
    const handleCreatePerson = async (data: CreatePersonRequest | UpdatePersonRequest) => {
        try {
            if (!('id' in data)) {
                await createMutation.mutateAsync(data as CreatePersonRequest);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.error('Create person error:', error);
        }
    };

    const handleUpdatePerson = async (data: CreatePersonRequest | UpdatePersonRequest) => {
        try {
            if ('id' in data) {
                await updateMutation.mutateAsync(data as UpdatePersonRequest);
                setEditingPerson(null);
            }
        } catch (error) {
            console.error('Update person error:', error);
        }
    };

    const handleDeletePerson = async () => {
        if (!deletingPerson) return;

        try {
            await deleteMutation.mutateAsync(deletingPerson.id);
            setDeletingPerson(null);
        } catch (error) {
            console.error('Delete person error:', error);
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
                <LoadingSpinner size={32} text="Đang tải danh sách người..." />
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
                            <UserPlus className="text-red-500" size={28} />
                            Quản lý người
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Tổng cộng: {peopleData?.totalItems || 0} người
                        </p>
                    </div>

                    <motion.button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus size={18} />
                        Thêm người
                    </motion.button>
                </div>

                {/* Search */}
                <div className="mt-4">
                    <SearchBox
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo tên..."
                        className="max-w-md"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    {peopleData?.items.length === 0 ? (
                        <div className="text-center py-12">
                            <UserPlus size={48} className="text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-400 mb-2">
                                {search ? 'Không tìm thấy người nào' : 'Chưa có người nào'}
                            </h3>
                            <p className="text-zinc-500">
                                {search ? 'Hãy thử từ khóa khác' : 'Thêm người đầu tiên'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {peopleData?.items.map((person) => (
                                <PersonCard
                                    key={person.id}
                                    person={person}
                                    onEdit={setEditingPerson}
                                    onDelete={setDeletingPerson}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {peopleData && peopleData.totalPages > 1 && (
                <div className="flex-shrink-0 p-6 border-t border-zinc-800">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={peopleData.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Modals */}
            <PersonModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreatePerson}
                loading={createMutation.isPending}
                title="Thêm người mới"
            />

            <PersonModal
                isOpen={!!editingPerson}
                onClose={() => setEditingPerson(null)}
                onSubmit={handleUpdatePerson}
                loading={updateMutation.isPending}
                title="Chỉnh sửa thông tin"
                initialData={editingPerson}
            />

            <ConfirmDialog
                isOpen={!!deletingPerson}
                onClose={() => setDeletingPerson(null)}
                onConfirm={handleDeletePerson}
                loading={deleteMutation.isPending}
                title="Xóa người"
                message={`Bạn có chắc chắn muốn xóa "${deletingPerson?.fullName}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                type="danger"
            />
        </div>
    );
}

// Person Card Component
interface PersonCardProps {
    person: Person;
    onEdit: (person: Person) => void;
    onDelete: (person: Person) => void;
}

function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
    const getGenderText = (gender: Gender) => {
        switch (gender) {
            case Gender.MALE: return 'Nam';
            case Gender.FEMALE: return 'Nữ';
            default: return 'Khác';
        }
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
            {/* Avatar */}
            <div className="aspect-square bg-zinc-800 flex items-center justify-center">
                {person.avatar ? (
                    <img
                        src={person.avatar}
                        alt={person.fullName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={48} className="text-zinc-600" />
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{person.fullName}</h3>
                        {person.otherName && (
                            <p className="text-sm text-zinc-400 mb-1">({person.otherName})</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span>{getGenderText(person.gender)}</span>
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(person.dateOfBirth)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => onEdit(person)}
                            className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Edit size={16} />
                        </motion.button>
                        <motion.button
                            onClick={() => onDelete(person)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Trash2 size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Bio */}
                {person.shortBio && (
                    <p className="text-sm text-zinc-400 line-clamp-2">{person.shortBio}</p>
                )}
            </div>
        </motion.div>
    );
}

// Person Modal Component
interface PersonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePersonRequest | UpdatePersonRequest) => void;
    loading: boolean;
    title: string;
    initialData?: Person | null;
}

function PersonModal({
    isOpen,
    onClose,
    onSubmit,
    loading,
    title,
    initialData
}: PersonModalProps) {
    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || '',
        otherName: initialData?.otherName || '',
        shortBio: initialData?.shortBio || '',
        avatar: initialData?.avatar || '',
        gender: initialData?.gender || Gender.MALE,
        day: initialData ? new Date(initialData.dateOfBirth).getDate() : 1,
        month: initialData ? new Date(initialData.dateOfBirth).getMonth() + 1 : 1,
        year: initialData ? new Date(initialData.dateOfBirth).getFullYear() : 1990
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            otherName: formData.otherName.trim() || null,
            shortBio: formData.shortBio.trim() || null,
            avatar: formData.avatar.trim() || null
        };

        if (initialData) {
            onSubmit({ ...submitData, id: initialData.id } as UpdatePersonRequest);
        } else {
            onSubmit(submitData as CreatePersonRequest);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden"
            >
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Họ tên *
                            </label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                placeholder="Nhập họ tên..."
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Other Name */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tên khác
                            </label>
                            <input
                                type="text"
                                value={formData.otherName}
                                onChange={(e) => setFormData(prev => ({ ...prev, otherName: e.target.value }))}
                                placeholder="Tên nghệ danh, biệt danh..."
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Giới tính *
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData(prev => ({ ...prev, gender: Number(e.target.value) as Gender }))}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                                required
                            >
                                <option value={Gender.MALE}>Nam</option>
                                <option value={Gender.FEMALE}>Nữ</option>
                                <option value={Gender.OTHER}>Khác</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Ngày sinh *
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <select
                                    value={formData.day}
                                    onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select
                                    value={formData.month}
                                    onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    value={formData.year}
                                    onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={loading}
                                    required
                                >
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Avatar URL */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                value={formData.avatar}
                                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        {/* Short Bio */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tiểu sử ngắn
                            </label>
                            <textarea
                                value={formData.shortBio}
                                onChange={(e) => setFormData(prev => ({ ...prev, shortBio: e.target.value }))}
                                placeholder="Mô tả ngắn về người này..."
                                rows={3}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
                        <motion.button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="px-4 py-2 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hủy
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={loading || !formData.fullName.trim()}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading && <LoadingSpinner size={16} />}
                            {initialData ? 'Cập nhật' : 'Tạo'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
