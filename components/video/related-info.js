import Link from "next/link"

export default function RelatedInfo({ animeId, episodes, currentEpisodeNumber }) {
  // Get a subset of episodes around the current one
  const getRelatedEpisodes = () => {
    if (!episodes || episodes.length === 0) return []

    const currentIndex = episodes.findIndex((ep) => ep.number === currentEpisodeNumber)

    // If current episode not found, return first 10 episodes
    if (currentIndex === -1) return episodes.slice(0, 10)

    // Get 5 episodes before and 5 after current episode
    const start = Math.max(0, currentIndex - 5)
    const end = Math.min(episodes.length, currentIndex + 6)

    return episodes.slice(start, end)
  }

  const relatedEpisodes = getRelatedEpisodes()

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <h3 className="text-lg font-semibold mb-4 text-white">Episodes</h3>

      <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {relatedEpisodes.map((episode) => (
          <Link
            key={episode.episodeId}
            href={`/watch/${animeId}/episode/${episode.number}`}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              episode.number === currentEpisodeNumber
                ? "bg-purple-900/30 border border-purple-900/30"
                : "hover:bg-gray-800 border border-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  episode.number === currentEpisodeNumber ? "bg-purple-600" : "bg-gray-800"
                }`}
              >
                <span className="text-white text-sm">{episode.number}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white line-clamp-1">{episode.title}</h4>
                {episode.isFiller && <span className="text-xs text-purple-400">Filler</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href={`/anime/${animeId}`} className="text-purple-400 hover:text-purple-300 text-sm">
          View All Episodes
        </Link>
      </div>
    </div>
  )
}
