import Link from 'next/link';
import Image from 'next/image';

export default function EpisodeGrid({ episodes }) {
  if (!episodes?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No episodes available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {episodes.map((episode) => (
        <Link
          href={`/watch/${episode.id}`}
          key={episode.id}
          className="group relative overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105"
        >
          <div className="aspect-video relative">
            <Image
              src={episode.image || '/placeholder.png'}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-2">
            <h3 className="text-sm font-medium truncate">{episode.title}</h3>
            <p className="text-xs text-gray-400">Episode {episode.number}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}