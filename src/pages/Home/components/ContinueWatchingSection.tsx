import { EpisodeCard } from '@/components';

/**
 * Continue Watching Section - Component riêng cho Home page
 * Hiển thị danh sách episodes đang xem dở
 */

interface ContinueWatchingSectionProps {
    onPlay: (movieId: number) => void;
    onInfo: (movieId: number) => void;
}

export default function ContinueWatchingSection({ onPlay }: ContinueWatchingSectionProps) {
    const episodes = [
        {
            id: 10,
            episode: 10,
            title: 'Inside Reagan',
            image: 'https://images.unsplash.com/photo-1574267432644-f74f8c95df9f?w=400&h=225&fit=crop',
            description: 'Reagan must travel to her own subconscious mind to find the user-ID\'s password, from when she was eight.',
        },
        {
            id: 3,
            episode: 3,
            title: 'Blue Bloods',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop',
            description: 'A renewed contract with subterranean and elope eldritch reptilians is threatened by an ill-conceived amag.',
        },
        {
            id: 7,
            episode: 7,
            title: 'Sex Machina',
            image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop',
            description: 'Reagan builds a robot to practice her dating skills. Nothing goes wrong from her.',
        },
        {
            id: 9,
            episode: 9,
            title: 'The Brettfast Club',
            image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=225&fit=crop',
            description: 'Brett hopes to turn a blast in the past be the team going on a nostalgia-laced mission to a small town.',
        },
        {
            id: 11,
            episode: 11,
            title: 'Flat Earth Wedding',
            image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=225&fit=crop',
            description: 'Reagan conspires to keep her dad from finding out about her mom\'s wedding, while J.R. ropes Brett.',
        },
    ];

    return (
        <div className="px-12 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Continue Watching</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {episodes.map((ep) => (
                    <EpisodeCard
                        key={ep.id}
                        episode={ep.episode}
                        title={ep.title}
                        image={ep.image}
                        description={ep.description}
                        onPlay={() => onPlay(ep.id)}
                    />
                ))}
            </div>
        </div>
    );
}
