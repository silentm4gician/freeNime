import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";

export default function AnimeSection({
  title,
  animes,
  viewAllLink,
  showEpisodes = false,
  isUpcoming = false,
}) {
  if (!animes || animes.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {/* <Link
          href={viewAllLink}
          className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
        >
          View All <ChevronRight size={16} />
        </Link> */}
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto pb-4 custom-scrollbar gap-4">
          {animes.map((anime) => (
            <div key={anime.id} className="flex-shrink-0 w-[180px] anime-card">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-purple-900/20 h-full flex flex-col">
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={anime.poster || "/placeholder.svg"}
                    alt={anime.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      href={
                        showEpisodes
                          ? `/watch/${anime.id}/episode/${anime.episodes.sub}`
                          : `/anime/${anime.id}`
                      }
                      className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                    >
                      <Play size={20} className="text-white" />
                    </Link>
                  </div>

                  {anime.rank && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        #{anime.rank}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 flex-grow flex flex-col">
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                    {anime.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                    {anime.jname}
                  </p>

                  <div className="mt-auto">
                    {showEpisodes && anime.episodes && (
                      <div className="text-xs text-gray-400">
                        Episode N°{" "}
                        <span className="text-purple-400">
                          {anime.episodes.sub}
                        </span>
                      </div>
                    )}

                    {isUpcoming && anime.duration && (
                      <div className="text-xs text-gray-400">
                        Release:{" "}
                        <span className="text-purple-400">
                          {anime.duration}
                        </span>
                      </div>
                    )}

                    {!showEpisodes && !isUpcoming && anime.type && (
                      <div className="text-xs text-gray-400">
                        Type:{" "}
                        <span className="text-purple-400">{anime.type}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
