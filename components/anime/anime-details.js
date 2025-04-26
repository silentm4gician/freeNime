export default function AnimeDetails({ anime }) {
  if (!anime || !anime.moreInfo) return null;

  const { moreInfo } = anime;

  const detailItems = [
    { label: "Japanese Title", value: moreInfo.japanese },
    { label: "Also Known As", value: moreInfo.synonyms },
    { label: "Aired", value: moreInfo.aired },
    { label: "Premiered", value: moreInfo.premiered },
    { label: "Duration", value: moreInfo.duration },
    { label: "Status", value: moreInfo.status },
    { label: "MAL Score", value: moreInfo.malscore },
    { label: "Studios", value: moreInfo.studios },
  ];

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <h2 className="text-xl font-bold mb-4 text-white">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailItems.map((item) => (
          <div key={item.label} className="border-b border-gray-800 pb-2">
            <span className="text-gray-400 text-sm">{item.label}: </span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {moreInfo.genres && moreInfo.genres.length > 0 && (
        <div className="mt-4">
          <span className="text-gray-400 text-sm">Genres: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {moreInfo.genres.map((genre) => (
              <span
                key={genre}
                className="bg-purple-900/30 text-purple-300 text-xs px-2.5 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {moreInfo.producers && moreInfo.producers.length > 0 && (
        <div className="mt-4">
          <span className="text-gray-400 text-sm">Producers: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {moreInfo.producers.map((producer) => (
              <span
                key={producer}
                className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full"
              >
                {producer}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
