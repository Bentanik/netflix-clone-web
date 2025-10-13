import { z } from "zod";

export const createPersonSchema = z.object({
  fullName: z
    .string()
    .min(1, "Họ tên không được để trống")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  otherName: z.string().optional().nullable(),
  shortBio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  gender: z.number().min(0).max(2),
  day: z.number().min(1, "Ngày phải từ 1-31").max(31, "Ngày phải từ 1-31"),
  month: z.number().min(1, "Tháng phải từ 1-12").max(12, "Tháng phải từ 1-12"),
  year: z
    .number()
    .min(1900, "Năm phải từ 1900 trở lên")
    .max(new Date().getFullYear(), "Năm không được vượt quá năm hiện tại"),
});

export const updatePersonSchema = createPersonSchema.partial().extend({
  id: z.string().min(1, "ID không được để trống"),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên thể loại không được để trống")
    .max(50, "Tên thể loại không được vượt quá 50 ký tự"),
});

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string().min(1, "ID không được để trống"),
});

export const createEpisodeSchema = z.object({
  title: z
    .string()
    .min(1, "Tiêu đề tập phim không được để trống")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  episodeNumber: z.number().min(1, "Số tập phải lớn hơn 0"),
  description: z.string().min(1, "Mô tả không được để trống"),
  duration: z.string().min(1, "Thời lượng không được để trống"),
  videoId: z.string().min(1, "Video ID không được để trống"),
  thumbnailId: z.string().min(1, "Thumbnail ID không được để trống"),
});

export const createMediaSchema = z.object({
  title: z
    .string()
    .min(1, "Tiêu đề không được để trống")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  description: z.string().min(1, "Mô tả không được để trống"),
  coverImageId: z.string().min(1, "Cover Image ID không được để trống"),
  ageRating: z
    .number()
    .min(0, "Độ tuổi phải từ 0 trở lên")
    .max(21, "Độ tuổi không được vượt quá 21"),
  country: z.string().min(1, "Quốc gia không được để trống"),
  totalDuration: z.string().min(1, "Tổng thời lượng không được để trống"),
  releaseDate: z.string().min(1, "Ngày phát hành không được để trống"),
  categoryIds: z.array(z.string()).min(1, "Phải chọn ít nhất 1 thể loại"),
  personIds: z.array(z.string()).min(1, "Phải chọn ít nhất 1 người"),
  episodes: z.array(createEpisodeSchema).optional(),
});

export const updateMediaSchema = createMediaSchema.partial().extend({
  id: z.string().min(1, "ID không được để trống"),
});

export const paginationSchema = z.object({
  page: z.number().min(1, "Trang phải lớn hơn 0"),
  pageSize: z
    .number()
    .min(1, "Kích thước trang phải lớn hơn 0")
    .max(100, "Kích thước trang không được vượt quá 100"),
  search: z.string().optional(),
});

export type CreatePersonFormData = z.infer<typeof createPersonSchema>;
export type UpdatePersonFormData = z.infer<typeof updatePersonSchema>;
export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
export type CreateEpisodeFormData = z.infer<typeof createEpisodeSchema>;
export type CreateMediaFormData = z.infer<typeof createMediaSchema>;
export type UpdateMediaFormData = z.infer<typeof updateMediaSchema>;
export type PaginationFormData = z.infer<typeof paginationSchema>;
