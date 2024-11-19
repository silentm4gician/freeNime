import { Hash } from "lucide-react";

export default function AnimeCard({ anime, index }) {
  return (
    <a
      href={`/anime/${anime.id}`}
      className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
    >
      <div className="aspect-[3/4] relative">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        {anime.releaseDate && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded flex items-center gap-1">
            <Hash className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">{index + 1}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-purple-400 line-clamp-2">
          {anime.title}
        </h3>
        {anime.releaseDate && (
          <p className="text-sm text-gray-400 mt-2">{anime.releaseDate}</p>
        )}
      </div>
    </a>
  );
}
