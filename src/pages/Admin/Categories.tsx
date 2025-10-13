import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Tag } from 'lucide-react';
import { useCategoriesQuery, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useAdminMock';
import {
    Pagination,
    SearchBox,
    LoadingSpinner,
    ConfirmDialog,
    CategoryCard,
    CategoryModal
} from '@/components/admin';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '@/types/admin';

export default function Categories() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    const pageSize = 10;

    // Queries and Mutations
    const { data: categoriesData, isLoading } = useCategoriesQuery({
        page: currentPage,
        pageSize,
        search
    });

    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();
    const deleteMutation = useDeleteCategory();

    // Handlers
    const handleCreateCategory = async (data: CreateCategoryRequest) => {
        try {
            await createMutation.mutateAsync(data);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error('Create category error:', error);
        }
    };

    const handleUpdateCategory = async (data: CreateCategoryRequest | UpdateCategoryRequest) => {
        try {
            if ('id' in data) {
                await updateMutation.mutateAsync(data as UpdateCategoryRequest);
                setEditingCategory(null);
            }
        } catch (error) {
            console.error('Update category error:', error);
        }
    };

    const handleDeleteCategory = async () => {
        if (!deletingCategory) return;

        try {
            await deleteMutation.mutateAsync(deletingCategory.id);
            setDeletingCategory(null);
        } catch (error) {
            console.error('Delete category error:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1); // Reset to first page when searching
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <LoadingSpinner size={32} text="Đang tải thể loại..." />
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
                            <Tag className="text-red-500" size={28} />
                            Quản lý thể loại
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Tổng cộng: {categoriesData?.totalItems || 0} thể loại
                        </p>
                    </div>

                    <motion.button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus size={18} />
                        Tạo thể loại
                    </motion.button>
                </div>

                {/* Search */}
                <div className="mt-4">
                    <SearchBox
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm thể loại..."
                        className="max-w-md"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    {categoriesData?.items.length === 0 ? (
                        <div className="text-center py-12">
                            <Tag size={48} className="text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-400 mb-2">
                                {search ? 'Không tìm thấy thể loại' : 'Chưa có thể loại nào'}
                            </h3>
                            <p className="text-zinc-500">
                                {search ? 'Hãy thử từ khóa khác' : 'Tạo thể loại đầu tiên của bạn'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categoriesData?.items.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onEdit={setEditingCategory}
                                    onDelete={setDeletingCategory}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {categoriesData && categoriesData.totalPages > 1 && (
                <div className="flex-shrink-0 p-6 border-t border-zinc-800">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={categoriesData.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Modals */}
            <CategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCategory}
                loading={createMutation.isPending}
                title="Tạo thể loại mới"
            />

            <CategoryModal
                isOpen={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                onSubmit={handleUpdateCategory}
                loading={updateMutation.isPending}
                title="Chỉnh sửa thể loại"
                initialData={editingCategory}
            />

            <ConfirmDialog
                isOpen={!!deletingCategory}
                onClose={() => setDeletingCategory(null)}
                onConfirm={handleDeleteCategory}
                loading={deleteMutation.isPending}
                title="Xóa thể loại"
                message={`Bạn có chắc chắn muốn xóa thể loại "${deletingCategory?.name}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                type="danger"
            />
        </div>
    );
}