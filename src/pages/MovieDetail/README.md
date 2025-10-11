# MovieDetail Page Structure

## Overview

The MovieDetail page follows the same component organization pattern as the Home page, with page-specific components stored in a `components/` subdirectory.

## File Structure

```
pages/MovieDetail/
├── index.tsx                 # Main page component (orchestrator)
├── components/
│   ├── index.ts             # Barrel export
│   ├── MovieHeroSection.tsx # Hero banner section
│   ├── EpisodesSection.tsx  # Episodes list section
│   ├── DetailsSection.tsx   # Movie metadata section
│   └── SimilarContentSection.tsx # Similar content section
└── README.md                # This file
```

## Component Responsibilities

### 1. **index.tsx** (Main Page - ~160 lines)

**Purpose**: Orchestrates all sections, manages state and navigation

**Responsibilities**:

- Mock data definition (will be replaced with API calls)
- Event handlers for navigation (play, add to list, etc.)
- URL params management (movie ID)
- Layout composition

**Code Example**:

```typescript
const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data
  const movieData = {...};
  const episodes = [...];
  const similarMovies = [...];

  // Handlers
  const handlePlayMovie = (movieId) => navigate(`/watch/${movieId}`);
  const handlePlayEpisode = (epId) => navigate(`/watch/${id}?episode=${epId}`);

  return (
    <div>
      <MovieHeroSection {...} />
      <EpisodesSection {...} />
      <DetailsSection {...} />
      <SimilarContentSection {...} />
    </div>
  );
};
```

---

### 2. **MovieHeroSection.tsx** (~20 lines)

**Purpose**: Wrapper for MovieHeroBanner component

**Props**:

```typescript
interface MovieHeroSectionProps {
  movie: HeroSlide; // Movie data in HeroSlide format
  onWatchNow: (id: number) => void;
  onAddToList: (id: number) => void;
}
```

**Why this exists**:

- Keeps page structure consistent with Home page pattern
- Easy to add page-specific hero modifications later
- Clear separation of concerns

---

### 3. **EpisodesSection.tsx** (~65 lines)

**Purpose**: Displays list of episodes with thumbnails and click-to-play

**Props**:

```typescript
interface Episode {
  id: number;
  number: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

interface EpisodesSectionProps {
  episodes: Episode[];
  onPlayEpisode: (episodeId: number) => void;
}
```

**Features**:

- Thumbnail with hover play icon
- Episode number, title, description
- Duration badge
- Stagger animation on load
- Click to play episode

**Animations**:

```typescript
// Section fade in
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}

// Episode cards stagger
transition={{ delay: 0.4 + index * 0.1 }}
```

---

### 4. **DetailsSection.tsx** (~40 lines)

**Purpose**: Displays movie metadata (cast, genres, creators, rating)

**Props**:

```typescript
interface MovieMetadata {
  cast: string[];
  genres: string[];
  creators: string[];
  ageRating: string;
}

interface DetailsSectionProps {
  metadata: MovieMetadata;
}
```

**Layout**: 2-column grid (responsive)

**Features**:

- Clean metadata display
- Fade-in animation
- Responsive grid layout

---

### 5. **SimilarContentSection.tsx** (~30 lines)

**Purpose**: Shows similar/recommended content using MovieRow

**Props**:

```typescript
interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  match: number;
}

interface SimilarContentSectionProps {
  movies: Movie[];
}
```

**Features**:

- Reuses MovieRow component
- Internal navigation handling
- Fade-in animation

---

## Benefits of This Structure

### 1. **Maintainability**

- Each section is isolated and easy to modify
- Clear file organization
- Easy to locate specific functionality

### 2. **Reusability**

- Components can be reused in other detail pages
- MovieHeroSection already wraps shared MovieHeroBanner
- Similar pattern to Home page (familiar)

### 3. **Testability**

- Each component can be tested independently
- Props are well-defined interfaces
- Mock data is isolated

### 4. **Scalability**

- Easy to add new sections (Reviews, Trailers, etc.)
- Easy to modify individual sections
- Clear dependencies

---

## Data Flow

```
MovieDetailPage (index.tsx)
  ├─ Fetches movie data (TODO: API)
  ├─ Defines event handlers
  └─ Passes data down to components
      │
      ├─ MovieHeroSection
      │   └─ MovieHeroBanner (shared component)
      │
      ├─ EpisodesSection
      │   └─ Renders episode cards
      │
      ├─ DetailsSection
      │   └─ Renders metadata grid
      │
      └─ SimilarContentSection
          └─ MovieRow (shared component)
```

---

## Navigation Flow

```
User Actions:
- Click "Play" in hero → navigate('/watch/:id')
- Click "Add to List" → Update Zustand store (TODO)
- Click episode card → navigate('/watch/:id?episode=X')
- Click similar movie "Play" → navigate('/watch/:otherId')
- Click similar movie "Info" → navigate('/movie/:otherId')
```

---

## Animation Timeline

```
0.0s - Hero section starts fading in
0.3s - Episodes section fades in
0.4s - First episode card slides in
0.5s - Second episode card slides in
0.6s - Third episode card slides in
0.7s - Details section fades in
0.9s - Similar content section fades in
```

---

## TODO: Future Enhancements

### API Integration

- [ ] Replace mock data with API calls
- [ ] Add loading states
- [ ] Error handling
- [ ] Cache with React Query

### Features

- [ ] Trailers section
- [ ] Reviews section
- [ ] Season selector
- [ ] Download options
- [ ] Share functionality

### UX Improvements

- [ ] Skeleton loading
- [ ] Infinite scroll for episodes
- [ ] Lazy load episode thumbnails
- [ ] Add to list feedback animation

---

## Component Size Comparison

| Component             | Lines    | Main Responsibility  |
| --------------------- | -------- | -------------------- |
| index.tsx             | ~160     | Orchestration + data |
| MovieHeroSection      | ~20      | Hero wrapper         |
| EpisodesSection       | ~65      | Episodes list        |
| DetailsSection        | ~40      | Metadata display     |
| SimilarContentSection | ~30      | Related content      |
| **Total**             | **~315** | **Full page**        |

**Before refactor**: 240 lines (all in index.tsx)
**After refactor**: 160 lines (main) + 155 lines (components)

**Benefits**:

- Improved readability
- Better organization
- Easier maintenance
- Consistent with Home page pattern

---

**Last Updated**: October 11, 2025
**Pattern**: Same as Home page structure
**Status**: ✅ Complete - Following best practices
