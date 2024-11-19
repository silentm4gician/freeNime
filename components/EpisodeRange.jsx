import Link from 'next/link';

export default function EpisodeRange({ episodes, currentEpisode, range = 5 }) {
  if (!episodes?.length) return null;

  // Calculate the range of episodes to show
  const start = Math.max(1, currentEpisode - Math.floor(range / 2));
  const end = Math.min(episodes.length, start + range - 1);

  // Get episodes within the range
  const rangeEpisodes = episodes.filter(
    ep => ep.number >= start && ep.number <= end
  );

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
      <div className="grid grid-cols-4 gap-2">
        {rangeEpisodes.map((episode) => (
          <Link
            key={episode.id}
            href={`/watch/${episode.id}`}
            className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
              episode.number === currentEpisode
                ? 'bg-purple-600 text-white'
                : 'bg-gray-900 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {episode.number}
          </Link>
        ))}
      </div>
    </div>
  );
}