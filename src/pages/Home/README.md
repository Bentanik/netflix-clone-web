# Home Page Structure

## Overview

Cấu trúc tổ chức cho trang Home theo pattern page-specific components.

## Folder Structure

```
pages/
  Home/
    index.tsx                    # HomePage component (main page)
    components/                  # Components riêng chỉ cho Home page
      HeroBannerSection.tsx     # Hero banner với data cụ thể
      ForYouSection.tsx         # "For You" movies section
      ContinueWatchingSection.tsx # "Continue Watching" section
      index.ts                  # Barrel export
```

## Nguyên tắc tổ chức

### 1. **index.tsx** - Main Page Component

- Component chính của trang Home
- Export default là `HomePage`
- Chứa:
  - Event handlers (handleWatchNow, handleAddToList, handleMoviePlay, handleMovieInfo)
  - Layout tổng thể của page
  - Import và sử dụng các sections từ `./components`

### 2. **components/** - Page-Specific Components

Chứa các component **CHỈ được sử dụng trong Home page**.

#### HeroBannerSection.tsx

- Wrapper cho `HeroBanner` component (từ `@/components`)
- Chứa hero slides data cụ thể cho trang Home
- Props: `onWatchNow`, `onAddToList`

#### ForYouSection.tsx

- Wrapper cho `MovieRow` component
- Chứa danh sách phim "For You"
- Props: `onPlay`, `onInfo`

#### ContinueWatchingSection.tsx

- Wrapper cho `MovieRow` component
- Chứa danh sách phim "Continue Watching"
- Props: `onPlay`, `onInfo`

## Component Hierarchy

```
HomePage (index.tsx)
├── HeroBannerSection
│   └── HeroBanner (from @/components)
└── Movie Rows Container
    ├── ForYouSection
    │   └── MovieRow (from @/components)
    └── ContinueWatchingSection
        └── MovieRow (from @/components)
```

## Usage Example

```tsx
// pages/Home/index.tsx
import {
  HeroBannerSection,
  ForYouSection,
  ContinueWatchingSection,
} from "./components";

export default function HomePage() {
  const handleWatchNow = (slideId: number) => {
    // Logic xử lý watch
  };

  return (
    <div>
      <HeroBannerSection onWatchNow={handleWatchNow} />
      <ForYouSection onPlay={handleMoviePlay} />
      <ContinueWatchingSection onPlay={handleMoviePlay} />
    </div>
  );
}
```

## Key Benefits

### 1. **Tách biệt concerns**

- Data + logic riêng cho từng section
- Dễ maintain và test
- Rõ ràng responsibility

### 2. **Reusability trong page**

- Các section components có thể tái sử dụng trong cùng page
- Ví dụ: Nhiều MovieRow sections với data khác nhau

### 3. **Không pollution global components**

- `./components` chỉ cho Home page
- Tránh conflict với components khác
- Clear separation giữa shared và page-specific

### 4. **Easy to scale**

- Thêm sections mới dễ dàng
- Refactor không ảnh hưởng pages khác
- Team members có thể làm việc độc lập

## Common Patterns

### Adding a new section

1. Tạo component trong `./components/`:

```tsx
// TrendingSection.tsx
export default function TrendingSection({ onPlay }: Props) {
    const trendingMovies = [...];
    return <MovieRow title="Trending" movies={trendingMovies} />;
}
```

2. Export trong `./components/index.ts`:

```tsx
export { default as TrendingSection } from "./TrendingSection";
```

3. Sử dụng trong `index.tsx`:

```tsx
import { TrendingSection } from "./components";

export default function HomePage() {
  return (
    <div>
      {/* ... */}
      <TrendingSection onPlay={handleMoviePlay} />
    </div>
  );
}
```

### Sharing logic between sections

Nếu cần share utility/helpers giữa các sections:

```
Home/
  components/
    HeroBannerSection.tsx
    ForYouSection.tsx
    utils/                    # Utilities riêng cho Home
      movieHelpers.ts
      constants.ts
```

## Anti-Patterns ❌

### ❌ KHÔNG nên:

1. Export components từ `./components` ra ngoài Home page
2. Import page-specific components vào pages khác
3. Đặt shared components vào `./components` (nên đặt trong `@/components`)
4. Hard-code data trực tiếp trong index.tsx (nên đặt trong section components)

### ✅ NÊN:

1. Giữ components trong `./components` chỉ cho Home page
2. Shared components → `@/components`
3. Data trong section components
4. Logic handlers trong index.tsx

## Future Enhancements

### 1. Data fetching

Sau này khi có API, mỗi section sẽ fetch data riêng:

```tsx
// ForYouSection.tsx
export default function ForYouSection({ onPlay }: Props) {
  const { data: movies } = useQuery({
    queryKey: ["movies", "forYou"],
    queryFn: () => fetchForYouMovies(),
  });

  return <MovieRow title="For You" movies={movies} />;
}
```

### 2. Personalization

Có thể customize sections dựa trên user preferences:

```tsx
// index.tsx
export default function HomePage() {
  const { preferences } = useUser();

  return (
    <div>
      <HeroBannerSection />
      {preferences.showForYou && <ForYouSection />}
      {preferences.showContinueWatching && <ContinueWatchingSection />}
    </div>
  );
}
```

### 3. Dynamic sections

Load sections based on user data:

```tsx
const sectionComponents = {
  forYou: ForYouSection,
  trending: TrendingSection,
  continueWatching: ContinueWatchingSection,
};

return sections.map((section) => {
  const Component = sectionComponents[section.type];
  return <Component key={section.id} {...section.props} />;
});
```

## Notes

- Tất cả sections import `HeroBanner` và `MovieRow` từ `@/components` (shared components)
- Event handlers được define ở `index.tsx` và pass down qua props
- Data được define trong mỗi section component
- Cấu trúc này giúp dễ test và maintain khi app scale lớn
