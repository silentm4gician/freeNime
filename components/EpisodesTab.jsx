import { memo } from "react";
import SeasonCarousel from "./SeasonCarousel";
import Link from "next/link";
import { Play, Star } from "lucide-react";

// Update the EpisodesTab component to use the merged data
export const EpisodesTab = memo(function EpisodesTab({
  episodes,
  isLoading,
  error,
  animeData,
  season,
  setSeason,
  TMDBID,
  anime,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!episodes.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        No episodes available
      </div>
    );
  }

  return (
    <>
      <SeasonCarousel
        animeData={animeData}
        season={season}
        setSeason={setSeason}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
        {episodes.map((episode) => (
          <Link
            key={episode.id}
            href={`/watch/${episode.id}`}
            className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
          >
            <div className="aspect-video relative">
              <img
                src={episode.image || anime.image}
                alt={episode.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12 text-purple-500" />
              </div>
              <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 rounded text-sm font-semibold">
                EP {episode.number}
              </div>
              {episode.vote_average && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500/80 rounded text-sm font-semibold flex justify-center items-center gap-1">
                  <Star size={15} />
                  {episode.vote_average}
                </div>
              )}
            </div>
            <div className="p-3 flex justify-between">
              <h3 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                {episode.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
});
