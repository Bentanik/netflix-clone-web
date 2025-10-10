import { HeroBanner } from '@/components';
import type { HeroSlide } from '@/types/hero';

/**
 * Hero Banner Section Component
 * Component riêng cho Home page - hiển thị hero banner với featured content
 */

interface HeroBannerSectionProps {
    onWatchNow: (slideId: number) => void;
    onAddToList: (slideId: number) => void;
}

export default function HeroBannerSection({ onWatchNow, onAddToList }: HeroBannerSectionProps) {
    // Hero slides data - specific to Home page
    const heroSlides: HeroSlide[] = [
        {
            id: 1,
            title: 'ARCANE',
            subtitle: 'LEAGUE OF LEGENDS',
            description: 'An aspiring utopian regime clashes with a violent radical underground. At the heart of this revolution of magic and tech, a family\'s bond is tested.',
            rating: 9.0,
            year: 2021,
            episodes: 9,
            match: 100,
            genres: ['Animation', 'Action', 'Adventure'],
            image: 'thumnail.jpg',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            badge: 'Series',
        },
        {
            id: 2,
            title: 'STRANGER THINGS',
            subtitle: '',
            description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
            rating: 8.7,
            year: 2016,
            seasons: 4,
            match: 97,
            genres: ['Sci-Fi', 'Horror', 'Drama'],
            image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&q=80',
            badge: 'Series',
        },
        {
            id: 3,
            title: 'THE WITCHER',
            subtitle: '',
            description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
            rating: 8.0,
            year: 2019,
            seasons: 3,
            match: 94,
            genres: ['Fantasy', 'Action', 'Adventure'],
            image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1920&q=80',
            badge: 'Series',
        },
    ];

    return (
        <HeroBanner
            slides={heroSlides}
            autoPlayInterval={6000}
            onWatchNow={onWatchNow}
            onAddToList={onAddToList}
        />
    );
}
