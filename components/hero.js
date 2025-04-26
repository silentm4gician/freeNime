import Link from "next/link"
import { Play } from "lucide-react"

export default function Hero({ spotlight }) {
  if (!spotlight) return null

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${spotlight.poster})`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center mb-4 space-x-3">
            <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
              #{spotlight.rank}
            </span>
            <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded">
              {spotlight.type}
            </span>
            <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded">
              {spotlight.episodes.sub} Episodes
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">{spotlight.name}</h1>
          <h2 className="text-lg text-gray-300 mb-4">{spotlight.jname}</h2>

          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">{spotlight.description}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/watch/${spotlight.id}/episode/1`}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
            >
              <Play size={18} />
              Watch Now
            </Link>
            <Link
              href={`/anime/${spotlight.id}`}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
