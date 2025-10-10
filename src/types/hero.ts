export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  year: number;
  episodes?: number;
  seasons?: number;
  match: number;
  genres: string[];
  image: string;
  video?: string;
  badge?: string;
}

export interface HeroBannerProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  onWatchNow?: (slideId: number) => void;
  onAddToList?: (slideId: number) => void;
}
