import AnimeCard from "./AnimeCard";
import LoadingSkeleton from "./LoadingSkeleton";

export default function AnimeGrid({ animes, loading, columns = 6, isEp }) {
  const gridCols = {
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <LoadingSkeleton key={i} type="card" />
        ))}
      </div>
    );
  }

  if (!animes || animes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No anime found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {animes.map((anime) => (
        <AnimeCard key={anime.id || anime.mal_id} anime={anime} isEp={isEp} />
      ))}
    </div>
  );
}
