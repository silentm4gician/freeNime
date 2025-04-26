import Image from "next/image";
import Link from "next/link";

export default function RecommendedAnimeList({ animes }) {
  if (!animes || animes.length === 0) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <h3 className="text-lg font-semibold mb-4 text-white">
        You May Also Like
      </h3>

      <div className="space-y-4">
        {animes.map((anime) => (
          <Link
            key={anime.id}
            href={`/anime/${anime.id}`}
            className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors"
          >
            <div className="relative w-12 h-16 flex-shrink-0">
              <Image
                src={anime.poster || "/placeholder.svg"}
                alt={anime.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white line-clamp-1">
                {anime.name}
              </h4>
              <p className="text-xs text-gray-400">
                {anime.type} • {anime.duration}
              </p>
              {anime.episodes && anime.episodes.sub && (
                <p className="text-xs text-purple-400">
                  {anime.episodes.sub} Episodes
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="mt-4 text-center">
        <Link
          href="/recommendations"
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          View More
        </Link>
      </div> */}
    </div>
  );
}
