import { Plus } from 'lucide-react';

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  year: number;
  duration?: string;
  seasons?: string;
  match: number;
}

export default function MovieCard({ title, image, rating, year, duration, seasons, match }: MovieCardProps) {
  return (
    <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Plus Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-gray-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:border-white">
          <Plus size={16} className="text-white" />
        </button>

        {/* Info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
          <div className="flex items-center gap-1.5 text-[10px] flex-wrap">
            <div className="flex items-center gap-1">
              <span className="bg-yellow-400 text-black px-1 py-0.5 font-bold">IMDb</span>
              <span className="text-white font-medium">{rating}</span>
            </div>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">{year}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">{duration || seasons}</span>
            <span className="text-gray-400">·</span>
            <span className="text-green-500 font-medium">{match}% match</span>
          </div>
        </div>
      </div>
    </div>
  );
}
