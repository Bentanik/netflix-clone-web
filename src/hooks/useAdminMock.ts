import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useNotification from "@/hooks/useNotification";
import {
  mockCategories,
  mockPeople,
  mockMedia,
  paginateData,
  mockApiDelay,
} from "@/mocks/adminMockData";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreatePersonRequest,
  UpdatePersonRequest,
  CreateMediaRequest,
  UpdateMediaRequest,
  PaginationRequest,
  Category,
  Person,
  Media,
} from "@/types/admin";

// Mock state management - using const with mutations
const categoriesState = [...mockCategories];
const peopleState = [...mockPeople];
const mediaState = [...mockMedia];

// Category Hooks
export const useCategoriesQuery = (params: PaginationRequest) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      await mockApiDelay();
      return paginateData(
        categoriesState,
        params.page,
        params.pageSize,
        params.search,
        ["name"]
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: async (data: CreateCategoryRequest): Promise<Category> => {
      await mockApiDelay();

      const newCategory: Category = {
        id: `cat_${Date.now()}`,
        name: data.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      categoriesState.push(newCategory);
      return newCategory;
    },
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
    mutationFn: async (data: UpdateCategoryRequest): Promise<Category> => {
      await mockApiDelay();

      const index = categoriesState.findIndex((cat) => cat.id === data.id);
      if (index === -1) throw new Error("Category not found");

      categoriesState[index] = {
        ...categoriesState[index],
        name: data.name,
        updatedAt: new Date().toISOString(),
      };

      return categoriesState[index];
    },
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
    mutationFn: async (id: string): Promise<void> => {
      await mockApiDelay();

      const index = categoriesState.findIndex((cat) => cat.id === id);
      if (index === -1) throw new Error("Category not found");

      categoriesState.splice(index, 1);
    },
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
    queryFn: async () => {
      await mockApiDelay();
      return paginateData(
        peopleState,
        params.page,
        params.pageSize,
        params.search,
        ["fullName", "otherName"]
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: async (data: CreatePersonRequest): Promise<Person> => {
      await mockApiDelay();

      const newPerson: Person = {
        id: `person_${Date.now()}`,
        fullName: data.fullName,
        otherName: data.otherName || null,
        shortBio: data.shortBio || null,
        avatar: data.avatar || null,
        gender: data.gender,
        dateOfBirth: new Date(
          data.year,
          data.month - 1,
          data.day
        ).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      peopleState.push(newPerson);
      return newPerson;
    },
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
    mutationFn: async (data: UpdatePersonRequest): Promise<Person> => {
      await mockApiDelay();

      const index = peopleState.findIndex((person) => person.id === data.id);
      if (index === -1) throw new Error("Person not found");

      const updatedPerson: Person = {
        ...peopleState[index],
        ...(data.fullName && { fullName: data.fullName }),
        ...(data.otherName !== undefined && {
          otherName: data.otherName || null,
        }),
        ...(data.shortBio !== undefined && { shortBio: data.shortBio || null }),
        ...(data.avatar !== undefined && { avatar: data.avatar || null }),
        ...(data.gender !== undefined && { gender: data.gender }),
        ...(data.day &&
          data.month &&
          data.year && {
            dateOfBirth: new Date(
              data.year,
              data.month - 1,
              data.day
            ).toISOString(),
          }),
        updatedAt: new Date().toISOString(),
      };

      peopleState[index] = updatedPerson;
      return updatedPerson;
    },
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
    mutationFn: async (id: string): Promise<void> => {
      await mockApiDelay();

      const index = peopleState.findIndex((person) => person.id === id);
      if (index === -1) throw new Error("Person not found");

      peopleState.splice(index, 1);
    },
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
    queryFn: async () => {
      await mockApiDelay();
      return paginateData(
        mediaState,
        params.page,
        params.pageSize,
        params.search,
        ["title", "description"]
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMediaDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["media", id],
    queryFn: async () => {
      await mockApiDelay();
      const media = mediaState.find((m) => m.id === id);
      if (!media) throw new Error("Media not found");
      return media;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateMedia = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation({
    mutationFn: async (data: CreateMediaRequest): Promise<Media> => {
      await mockApiDelay();

      const selectedCategories = categoriesState.filter((cat) =>
        data.categoryIds.includes(cat.id)
      );
      const selectedPeople = peopleState.filter((person) =>
        data.personIds.includes(person.id)
      );

      const newMedia: Media = {
        id: `media_${Date.now()}`,
        title: data.title,
        description: data.description,
        coverImageId: data.coverImageId,
        coverImageUrl: `https://via.placeholder.com/300x450?text=${encodeURIComponent(
          data.title
        )}`,
        ageRating: data.ageRating,
        country: data.country,
        totalDuration: data.totalDuration,
        releaseDate: data.releaseDate,
        categories: selectedCategories,
        people: selectedPeople,
        episodes:
          data.episodes?.map((ep, index) => ({
            id: `ep_${Date.now()}_${index}`,
            title: ep.title,
            episodeNumber: ep.episodeNumber,
            description: ep.description,
            duration: ep.duration,
            videoId: ep.videoId,
            videoUrl: `https://example.com/${ep.videoId}.mp4`,
            thumbnailId: ep.thumbnailId,
            thumbnailUrl: `https://via.placeholder.com/300x169?text=Episode+${ep.episodeNumber}`,
            mediaId: `media_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })) || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mediaState.push(newMedia);
      return newMedia;
    },
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
    mutationFn: async (data: UpdateMediaRequest): Promise<Media> => {
      await mockApiDelay();

      const index = mediaState.findIndex((media) => media.id === data.id);
      if (index === -1) throw new Error("Media not found");

      // Keep the original structure and only update provided fields
      const updatedMedia = {
        ...mediaState[index],
        title: data.title || mediaState[index].title,
        description: data.description || mediaState[index].description,
        updatedAt: new Date().toISOString(),
      };
      mediaState[index] = updatedMedia;

      return updatedMedia;
    },
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
    mutationFn: async (id: string): Promise<void> => {
      await mockApiDelay();

      const index = mediaState.findIndex((media) => media.id === id);
      if (index === -1) throw new Error("Media not found");

      mediaState.splice(index, 1);
    },
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
