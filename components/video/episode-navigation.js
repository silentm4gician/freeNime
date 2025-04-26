"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, List } from "lucide-react"

export default function EpisodeNavigation({ animeId, currentEpisode, prevEpisode, nextEpisode, totalEpisodes }) {
  return (
    <div className="flex items-center justify-between mt-4 bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <Link
        href={prevEpisode ? `/watch/${animeId}/episode/${prevEpisode.number}` : "#"}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          prevEpisode
            ? "bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
        }`}
        onClick={(e) => !prevEpisode && e.preventDefault()}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="flex items-center">
        <span className="text-purple-400 font-medium">Episode {currentEpisode.number}</span>
        <span className="text-gray-400 mx-2">of</span>
        <span className="text-gray-300">{totalEpisodes}</span>

        <Link
          href={`/anime/${animeId}`}
          className="ml-4 flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <List size={16} />
          <span className="hidden sm:inline">All Episodes</span>
        </Link>
      </div>

      <Link
        href={nextEpisode ? `/watch/${animeId}/episode/${nextEpisode.number}` : "#"}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          nextEpisode
            ? "bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            : "bg-purple-600/50 text-gray-300 cursor-not-allowed"
        }`}
        onClick={(e) => !nextEpisode && e.preventDefault()}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </Link>
    </div>
  )
}
