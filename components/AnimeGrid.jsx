import AnimeCard from './AnimeCard';

export default function AnimeGrid({ animes }) {
  if (!animes?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No anime found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {animes.map((anime,i) => (
        <AnimeCard key={anime.id} anime={anime} index={i}/>
      ))}
    </div>
  );
}