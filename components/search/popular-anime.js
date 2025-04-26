import Link from "next/link";
import Image from "next/image";

export default function PopularAnime({ animes }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <h3 className="text-lg font-semibold mb-4 text-white">Popular Anime</h3>

      <div className="space-y-4">
        {animes.slice(0, 5).map((anime) => (
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
                {anime.type} • {anime.episodes.sub} Eps
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="mt-4 text-center">
        <Link href="/popular" className="text-purple-400 hover:text-purple-300 text-sm">
          View More
        </Link>
      </div> */}
    </div>
  );
}
