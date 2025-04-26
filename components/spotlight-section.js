import Link from "next/link";
import Image from "next/image";
import { Play, Info } from "lucide-react";

export default function SpotlightSection({ spotlightAnimes }) {
  if (!spotlightAnimes || spotlightAnimes.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Spotlight</h2>
        {/* <Link href="/spotlight" className="text-purple-400 hover:text-purple-300 text-sm">
          View All
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlightAnimes.slice(0, 6).map((anime) => (
          <div
            key={anime.id}
            className="spotlight-card rounded-xl overflow-hidden shadow-lg anime-card border border-purple-900/20"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={anime.poster || "/placeholder.svg"}
                alt={anime.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute top-2 left-2 flex gap-2">
                <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  #{anime.rank}
                </span>
                <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
                  {anime.type}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                {anime.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                {anime.jname}
              </p>

              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {anime.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span className="text-purple-400">{anime.episodes.sub}</span>{" "}
                  Episodes
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/anime/${anime.id}`}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Info size={16} className="text-gray-300" />
                  </Link>
                  {/* <Link
                    href={`/watch/${anime.id}`}
                    className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                  >
                    <Play size={16} className="text-white" />
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
