import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryServices,
  personServices,
  mediaServices,
} from "@/services/admin";
import useNotification from "@/hooks/useNotification";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreatePersonRequest,
  UpdatePersonRequest,
  CreateMediaRequest,
  UpdateMediaRequest,
  PaginationRequest,
} from "@/types/admin";

// Category Hooks
export const useCategoriesQuery = (params: PaginationRequest) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryServices.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notification.success("Thành công", "Tạo thể loại thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể tạo thể loại. Vui lòng thử lại.");
      console.error("Create category error:", error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => categoryServices.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notification.success("Thành công", "Cập nhật thể loại thành công!");
    },
    onError: (error) => {
      notification.error(
        "Lỗi",
        "Không thể cập nhật thể loại. Vui lòng thử lại."
      );
      console.error("Update category error:", error);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (id: string) => categoryServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notification.success("Thành công", "Xóa thể loại thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể xóa thể loại. Vui lòng thử lại.");
      console.error("Delete category error:", error);
    },
  });
};

// Person Hooks
export const usePeopleQuery = (params: PaginationRequest) => {
  return useQuery({
    queryKey: ["people", params],
    queryFn: () => personServices.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: CreatePersonRequest) => personServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      notification.success("Thành công", "Tạo người thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể tạo người. Vui lòng thử lại.");
      console.error("Create person error:", error);
    },
  });
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: UpdatePersonRequest) => personServices.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      notification.success("Thành công", "Cập nhật người thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể cập nhật người. Vui lòng thử lại.");
      console.error("Update person error:", error);
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (id: string) => personServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      notification.success("Thành công", "Xóa người thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể xóa người. Vui lòng thử lại.");
      console.error("Delete person error:", error);
    },
  });
};

// Media Hooks
export const useMediaQuery = (params: PaginationRequest) => {
  return useQuery({
    queryKey: ["media", params],
    queryFn: () => mediaServices.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMediaDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["media", id],
    queryFn: () => mediaServices.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateMedia = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: CreateMediaRequest) => mediaServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      notification.success("Thành công", "Tạo media thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể tạo media. Vui lòng thử lại.");
      console.error("Create media error:", error);
    },
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (data: UpdateMediaRequest) => mediaServices.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      notification.success("Thành công", "Cập nhật media thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể cập nhật media. Vui lòng thử lại.");
      console.error("Update media error:", error);
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: (id: string) => mediaServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      notification.success("Thành công", "Xóa media thành công!");
    },
    onError: (error) => {
      notification.error("Lỗi", "Không thể xóa media. Vui lòng thử lại.");
      console.error("Delete media error:", error);
    },
  });
};
