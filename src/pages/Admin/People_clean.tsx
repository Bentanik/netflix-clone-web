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