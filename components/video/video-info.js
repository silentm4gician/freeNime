import Image from "next/image"
import Link from "next/link"
import { Clock, Tag } from "lucide-react"

export default function VideoInfo({ anime, episode, episodeNumber }) {
  if (!anime || !episode) return null

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <h1 className="text-2xl font-bold text-white mb-1">
        {anime.name} - Episode {episodeNumber}
      </h1>
      <h2 className="text-lg text-purple-400 mb-4">{episode.title}</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Tag size={14} />
          <span>{anime.stats.type}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock size={14} />
          <span>{anime.stats.duration}</span>
        </div>
        {episode.isFiller && (
          <div className="bg-purple-600/20 text-purple-400 text-xs font-semibold px-2.5 py-1 rounded">
            Filler Episode
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 hidden sm:block">
          <div className="relative w-24 h-36 rounded-md overflow-hidden">
            <Image src={anime.poster || "/placeholder.svg"} alt={anime.name} fill className="object-cover" />
          </div>
        </div>

        <div>
          <p className="text-gray-300 text-sm">{anime.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/anime/${anime.id}`} className="text-purple-400 hover:text-purple-300 text-sm font-medium">
          View Anime Details
        </Link>

        <div className="flex gap-2">
          <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded-full transition-colors">
            Add to Favorites
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded-full transition-colors">
            Share
          </button>
        </div>
      </div>
    </section>
  )
}
