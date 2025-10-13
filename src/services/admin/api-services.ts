import request from "@/services/interceptors";
import { ADMIN_API_PATHS } from "./api-path";
import type {
  Category,
  Person,
  Media,
  CreateCategoryRequest,
  CreatePersonRequest,
  CreateMediaRequest,
  UpdateCategoryRequest,
  UpdatePersonRequest,
  UpdateMediaRequest,
  PaginationRequest,
  PaginatedResponse,
} from "@/types/admin";

// Category Services
export const categoryServices = {
  getAll: (params: PaginationRequest): Promise<PaginatedResponse<Category>> => {
    return request.get(ADMIN_API_PATHS.CATEGORIES, { params });
  },

  create: (data: CreateCategoryRequest): Promise<Category> => {
    return request.post(ADMIN_API_PATHS.CREATE_CATEGORY, data);
  },

  update: (data: UpdateCategoryRequest): Promise<Category> => {
    return request.put(ADMIN_API_PATHS.UPDATE_CATEGORY(data.id), data);
  },

  delete: (id: string): Promise<void> => {
    return request.delete(ADMIN_API_PATHS.DELETE_CATEGORY(id));
  },
};

// Person Services
export const personServices = {
  getAll: (params: PaginationRequest): Promise<PaginatedResponse<Person>> => {
    return request.get(ADMIN_API_PATHS.PEOPLE, { params });
  },

  create: (data: CreatePersonRequest): Promise<Person> => {
    return request.post(ADMIN_API_PATHS.CREATE_PERSON, data);
  },

  update: (data: UpdatePersonRequest): Promise<Person> => {
    return request.put(ADMIN_API_PATHS.UPDATE_PERSON(data.id), data);
  },

  delete: (id: string): Promise<void> => {
    return request.delete(ADMIN_API_PATHS.DELETE_PERSON(id));
  },
};

// Media Services
export const mediaServices = {
  getAll: (params: PaginationRequest): Promise<PaginatedResponse<Media>> => {
    return request.get(ADMIN_API_PATHS.MEDIA, { params });
  },

  getById: (id: string): Promise<Media> => {
    return request.get(ADMIN_API_PATHS.MEDIA_DETAIL(id));
  },

  create: (data: CreateMediaRequest): Promise<Media> => {
    return request.post(ADMIN_API_PATHS.CREATE_MEDIA, data);
  },

  update: (data: UpdateMediaRequest): Promise<Media> => {
    return request.put(ADMIN_API_PATHS.UPDATE_MEDIA(data.id), data);
  },

  delete: (id: string): Promise<void> => {
    return request.delete(ADMIN_API_PATHS.DELETE_MEDIA(id));
  },
};

// File Upload Services
export const uploadServices = {
  uploadImage: (file: File): Promise<{ id: string; url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    return request.post(ADMIN_API_PATHS.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  uploadVideo: (file: File): Promise<{ id: string; url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    return request.post(ADMIN_API_PATHS.UPLOAD_VIDEO, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
