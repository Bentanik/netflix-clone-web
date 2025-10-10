# Movie Store - Zustand

Store quản lý danh sách phim yêu thích của user với Zustand và persist middleware.

## Features

- ✅ **Add to My List** - Thêm phim vào danh sách yêu thích
- ✅ **Remove from My List** - Xóa phim khỏi danh sách
- ✅ **Check if in My List** - Kiểm tra phim đã có trong danh sách chưa
- ✅ **Local Storage Persistence** - Tự động lưu vào localStorage

## Usage

```tsx
import { useMovieStore } from "@/stores/zustand/useMovieStore";

function MovieCard({ id, title, image, description, episode }) {
  const { addToMyList, removeFromMyList, isInMyList } = useMovieStore();
  const inMyList = isInMyList(id);

  const handleToggleMyList = () => {
    if (inMyList) {
      removeFromMyList(id);
    } else {
      addToMyList({ id, title, image, description, episode });
    }
  };

  return (
    <button onClick={handleToggleMyList}>
      {inMyList ? "Remove" : "Add to List"}
    </button>
  );
}
```

## API

### State

- `myList: Movie[]` - Danh sách các phim đã lưu

### Actions

- `addToMyList(movie: Movie)` - Thêm phim vào danh sách (tự động check duplicate)
- `removeFromMyList(movieId: number)` - Xóa phim theo ID
- `isInMyList(movieId: number)` - Kiểm tra phim có trong danh sách không

## Movie Interface

```typescript
interface Movie {
  id: number;
  title: string;
  image: string;
  description?: string;
  episode?: number;
}
```

## Persistence

Data được tự động lưu vào `localStorage` với key `movie-storage`.
Khi reload page, danh sách sẽ được restore tự động.
