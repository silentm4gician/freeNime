import Image from "next/image";
import Link from "next/link";
import { Play, Info, Star, Clock, Tag } from "lucide-react";

export default function AnimeHeader({ anime }) {
  if (!anime) return null;

  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${anime.poster})`,
            filter: "brightness(0.3) blur(8px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 -mt-72">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-72 md:w-64 md:h-96 rounded-lg overflow-hidden shadow-lg border-2 border-purple-900/30">
              <Image
                src={anime.poster || "/placeholder.svg"}
                alt={anime.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow pt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {anime.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {anime.stats.rating && (
                <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                  <Tag size={12} />
                  {anime.stats.rating}
                </span>
              )}
              <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <Info size={12} />
                {anime.stats.type}
              </span>
              <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <Clock size={12} />
                {anime.stats.duration}
              </span>
              <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <Star size={12} />
                {anime.stats.quality}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 text-sm md:text-base">
                {anime.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              <Link
                href={`/watch/${anime.id}/episode/1`}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
              >
                <Play size={18} />
                Watch Now
              </Link>
              {/* <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
                Add to List
              </button> */}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-gray-900/80 rounded-lg p-3 flex flex-col items-center">
                <span className="text-purple-400 text-xl font-bold">
                  {anime.stats.episodes.sub}
                </span>
                <span className="text-gray-400 text-xs">Episodes</span>
              </div>
              <div className="bg-gray-900/80 rounded-lg p-3 flex flex-col items-center">
                <span className="text-purple-400 text-xl font-bold">
                  {anime.stats.episodes.dub}
                </span>
                <span className="text-gray-400 text-xs">Dubbed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
