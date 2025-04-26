import Image from "next/image";
import Link from "next/link";

export default function RelatedAnimeList({ animes }) {
  if (!animes || animes.length === 0) return null;

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <h2 className="text-xl font-bold mb-4 text-white">Related Anime</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {animes.map((anime) => (
          <Link
            key={anime.id}
            href={`/anime/${anime.id}`}
            className="anime-card"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={anime.poster || "/placeholder.svg"}
                  alt={anime.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
                      {anime.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium text-white line-clamp-1">
                  {anime.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {anime.jname}
                </p>
                {anime.episodes && (
                  <p className="text-xs text-purple-400 mt-1">
                    {anime.episodes.sub} Episodes
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
