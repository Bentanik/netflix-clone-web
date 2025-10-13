import type { Category, Person, Media, PaginatedResponse } from "@/types/admin";
import { Gender } from "@/types/admin";

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Hành động",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Hài kịch",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    name: "Kinh dị",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    name: "Lãng mạn",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    name: "Khoa học viễn tưởng",
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "6",
    name: "Tài liệu",
    createdAt: "2024-01-20T13:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z",
  },
  {
    id: "7",
    name: "Anime",
    createdAt: "2024-01-21T15:10:00Z",
    updatedAt: "2024-01-21T15:10:00Z",
  },
  {
    id: "8",
    name: "Tâm lý",
    createdAt: "2024-01-22T08:25:00Z",
    updatedAt: "2024-01-22T08:25:00Z",
  },
];

// Mock People
export const mockPeople: Person[] = [
  {
    id: "1",
    fullName: "Nguyễn Văn A",
    otherName: "Johnny Nguyen",
    shortBio: "Diễn viên hành động nổi tiếng với nhiều bộ phim bom tấn.",
    avatar: "https://via.placeholder.com/150x150?text=Avatar1",
    gender: Gender.MALE,
    dateOfBirth: "1985-03-15T00:00:00Z",
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-10T10:30:00Z",
  },
  {
    id: "2",
    fullName: "Trần Thị B",
    otherName: null,
    shortBio: "Đạo diễn tài năng với nhiều tác phẩm được giải thưởng.",
    avatar: "https://via.placeholder.com/150x150?text=Avatar2",
    gender: Gender.FEMALE,
    dateOfBirth: "1978-07-22T00:00:00Z",
    createdAt: "2024-01-11T14:20:00Z",
    updatedAt: "2024-01-11T14:20:00Z",
  },
  {
    id: "3",
    fullName: "Lê Minh C",
    otherName: "Charlie Le",
    shortBio: null,
    avatar: null,
    gender: Gender.MALE,
    dateOfBirth: "1992-11-08T00:00:00Z",
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "4",
    fullName: "Phạm Thị D",
    otherName: "Diana Pham",
    shortBio: "Diễn viên trẻ triển vọng với nhiều vai diễn ấn tượng.",
    avatar: "https://via.placeholder.com/150x150?text=Avatar4",
    gender: Gender.FEMALE,
    dateOfBirth: "1995-05-30T00:00:00Z",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
  },
  {
    id: "5",
    fullName: "Hoàng Văn E",
    otherName: null,
    shortBio: "Đạo diễn phim hài với phong cách độc đáo.",
    avatar: "https://via.placeholder.com/150x150?text=Avatar5",
    gender: Gender.MALE,
    dateOfBirth: "1982-12-14T00:00:00Z",
    createdAt: "2024-01-14T11:30:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
];

// Mock Media
export const mockMedia: Media[] = [
  {
    id: "1",
    title: "Avengers: Endgame",
    description: "Cuộc chiến cuối cùng để cứu vũ trụ khỏi Thanos.",
    coverImageId: "cover1",
    coverImageUrl: "https://via.placeholder.com/300x450?text=Avengers",
    ageRating: 13,
    country: "Mỹ",
    totalDuration: "03:01:00",
    releaseDate: "2019-04-26T00:00:00Z",
    categories: [mockCategories[0], mockCategories[4]], // Hành động, Khoa học viễn tưởng
    people: [mockPeople[0], mockPeople[1]], // Nguyễn Văn A, Trần Thị B
    episodes: [],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Stranger Things",
    description: "Bộ phim kinh dị khoa học viễn tưởng về thế giới ngược.",
    coverImageId: "cover2",
    coverImageUrl: "https://via.placeholder.com/300x450?text=Stranger+Things",
    ageRating: 16,
    country: "Mỹ",
    totalDuration: "08:00:00",
    releaseDate: "2016-07-15T00:00:00Z",
    categories: [mockCategories[2], mockCategories[4]], // Kinh dị, Khoa học viễn tưởng
    people: [mockPeople[2], mockPeople[3]], // Lê Minh C, Phạm Thị D
    episodes: [
      {
        id: "ep1",
        title: "Sự biến mất của Will Byers",
        episodeNumber: 1,
        description: "Một cậu bé biến mất bí ẩn trong thị trấn Hawkins.",
        duration: "00:47:00",
        videoId: "video1",
        videoUrl: "https://example.com/video1.mp4",
        thumbnailId: "thumb1",
        thumbnailUrl: "https://via.placeholder.com/300x169?text=Episode+1",
        mediaId: "2",
        createdAt: "2024-01-16T10:30:00Z",
        updatedAt: "2024-01-16T10:30:00Z",
      },
      {
        id: "ep2",
        title: "Kẻ lạ mặt trên đường Maple",
        episodeNumber: 2,
        description:
          "Một cô gái bí ẩn xuất hiện với những khả năng siêu nhiên.",
        duration: "00:55:00",
        videoId: "video2",
        videoUrl: "https://example.com/video2.mp4",
        thumbnailId: "thumb2",
        thumbnailUrl: "https://via.placeholder.com/300x169?text=Episode+2",
        mediaId: "2",
        createdAt: "2024-01-16T10:30:00Z",
        updatedAt: "2024-01-16T10:30:00Z",
      },
    ],
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    title: "The Office",
    description: "Bộ phim hài về cuộc sống văn phòng.",
    coverImageId: "cover3",
    coverImageUrl: "https://via.placeholder.com/300x450?text=The+Office",
    ageRating: 13,
    country: "Mỹ",
    totalDuration: "20:00:00",
    releaseDate: "2005-03-24T00:00:00Z",
    categories: [mockCategories[1]], // Hài kịch
    people: [mockPeople[4]], // Hoàng Văn E
    episodes: [],
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
];

// Helper functions for pagination
export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number,
  searchTerm?: string,
  searchFields?: (keyof T)[]
): PaginatedResponse<T> => {
  let filteredData = data;

  // Apply search filter
  if (searchTerm && searchFields) {
    filteredData = data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredData.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
    pageSize,
  };
};

// Mock API delay
export const mockApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
