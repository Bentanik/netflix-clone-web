/**
 * React Query Keys
 * Centralized query key management for type safety and consistency
 */

export const queryKeys = {
  // Auth queries
  auth: {
    all: ["auth"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
    user: (userId: string) => [...queryKeys.auth.all, "user", userId] as const,
  },

  // Movie queries
  movies: {
    all: ["movies"] as const,
    lists: () => [...queryKeys.movies.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.movies.lists(), filters] as const,
    details: () => [...queryKeys.movies.all, "detail"] as const,
    detail: (id: number | string) =>
      [...queryKeys.movies.details(), id] as const,
    search: (query: string) =>
      [...queryKeys.movies.all, "search", query] as const,
    trending: () => [...queryKeys.movies.all, "trending"] as const,
    popular: () => [...queryKeys.movies.all, "popular"] as const,
    topRated: () => [...queryKeys.movies.all, "top-rated"] as const,
    genres: () => [...queryKeys.movies.all, "genres"] as const,
    byGenre: (genreId: number) =>
      [...queryKeys.movies.all, "genre", genreId] as const,
  },

  // My List queries
  myList: {
    all: ["myList"] as const,
    items: () => [...queryKeys.myList.all, "items"] as const,
  },

  // User preferences
  preferences: {
    all: ["preferences"] as const,
    theme: () => [...queryKeys.preferences.all, "theme"] as const,
    language: () => [...queryKeys.preferences.all, "language"] as const,
  },
} as const;

/**
 * Mutation Keys
 * Keys for mutations (optional but recommended for better DevTools experience)
 */
export const mutationKeys = {
  auth: {
    login: ["auth", "login"] as const,
    register: ["auth", "register"] as const,
    logout: ["auth", "logout"] as const,
    updateProfile: ["auth", "update-profile"] as const,
    changePassword: ["auth", "change-password"] as const,
  },

  movies: {
    addToList: ["movies", "add-to-list"] as const,
    removeFromList: ["movies", "remove-from-list"] as const,
    rate: ["movies", "rate"] as const,
  },
} as const;
