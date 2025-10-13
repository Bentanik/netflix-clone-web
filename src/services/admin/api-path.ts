export const ADMIN_API_PATHS = {
  // Categories
  CATEGORIES: "/admin/categories",
  CREATE_CATEGORY: "/admin/categories",
  UPDATE_CATEGORY: (id: string) => `/admin/categories/${id}`,
  DELETE_CATEGORY: (id: string) => `/admin/categories/${id}`,

  // People
  PEOPLE: "/admin/people",
  CREATE_PERSON: "/admin/people",
  UPDATE_PERSON: (id: string) => `/admin/people/${id}`,
  DELETE_PERSON: (id: string) => `/admin/people/${id}`,

  // Media
  MEDIA: "/admin/media",
  CREATE_MEDIA: "/admin/media",
  UPDATE_MEDIA: (id: string) => `/admin/media/${id}`,
  DELETE_MEDIA: (id: string) => `/admin/media/${id}`,
  MEDIA_DETAIL: (id: string) => `/admin/media/${id}`,

  // Episodes
  EPISODES: (mediaId: string) => `/admin/media/${mediaId}/episodes`,
  CREATE_EPISODE: (mediaId: string) => `/admin/media/${mediaId}/episodes`,
  UPDATE_EPISODE: (mediaId: string, episodeId: string) =>
    `/admin/media/${mediaId}/episodes/${episodeId}`,
  DELETE_EPISODE: (mediaId: string, episodeId: string) =>
    `/admin/media/${mediaId}/episodes/${episodeId}`,

  // File Upload
  UPLOAD_IMAGE: "/admin/upload/image",
  UPLOAD_VIDEO: "/admin/upload/video",
} as const;
