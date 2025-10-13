// Admin Types
export const Gender = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface CreatePersonRequest {
  fullName: string;
  otherName?: string | null;
  shortBio?: string | null;
  avatar?: string | null;
  gender: Gender;
  day: number;
  month: number;
  year: number;
}

export interface Person {
  id: string;
  fullName: string;
  otherName: string | null;
  shortBio: string | null;
  avatar: string | null;
  gender: Gender;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMediaRequest {
  title: string;
  description: string;
  coverImageId: string;
  ageRating: number;
  country: string;
  totalDuration: string; // TimeSpan as string
  releaseDate: string;
  categoryIds: string[];
  personIds: string[];
  episodes?: CreateEpisodeRequest[];
}

export interface CreateEpisodeRequest {
  title: string;
  episodeNumber: number;
  description: string;
  duration: string; // TimeSpan as string
  videoId: string;
  thumbnailId: string;
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  description: string;
  duration: string;
  videoId: string;
  videoUrl: string;
  thumbnailId: string;
  thumbnailUrl: string;
  mediaId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  title: string;
  description: string;
  coverImageId: string;
  coverImageUrl: string;
  ageRating: number;
  country: string;
  totalDuration: string;
  releaseDate: string;
  categories: Category[];
  people: Person[];
  episodes: Episode[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePersonRequest extends Partial<CreatePersonRequest> {
  id: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

export interface UpdateMediaRequest extends Partial<CreateMediaRequest> {
  id: string;
}

// Pagination
export interface PaginationRequest {
  page: number;
  pageSize: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
