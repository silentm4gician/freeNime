"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Filter } from "lucide-react"

export default function EpisodesList({ animeId, episodes, totalEpisodes }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showFillers, setShowFillers] = useState(true)
  const episodesPerPage = 12

  // Filter episodes based on filler preference
  const filteredEpisodes = showFillers ? episodes : episodes?.filter((episode) => !episode.isFiller)

  // Calculate pagination
  const indexOfLastEpisode = currentPage * episodesPerPage
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage
  const currentEpisodes = filteredEpisodes?.slice(indexOfFirstEpisode, indexOfLastEpisode)
  const totalPages = Math.ceil(filteredEpisodes?.length / episodesPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2 sm:mb-0">Episodes</h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-fillers"
              checked={showFillers}
              onChange={() => setShowFillers(!showFillers)}
              className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="show-fillers" className="text-sm text-gray-300 flex items-center gap-1">
              <Filter size={14} /> Show Fillers
            </label>
          </div>

          <div className="text-sm text-gray-400">
            Total: <span className="text-purple-400">{totalEpisodes}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentEpisodes?.map((episode) => (
          <Link
            key={episode.episodeId}
            href={`/watch/${animeId}/episode/${episode.number}`}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              episode.isFiller
                ? "bg-purple-900/10 hover:bg-purple-900/20 border border-purple-900/20"
                : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 mr-3">
              <span className="text-white font-medium">{episode.number}</span>
            </div>

            <div className="flex-grow">
              <h3 className="text-white text-sm font-medium line-clamp-1">{episode.title}</h3>
              {episode.isFiller && <span className="text-xs text-purple-400">Filler Episode</span>}
            </div>

            <div className="flex-shrink-0 ml-2">
              <div className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors">
                <Play size={14} className="text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              // Show limited page numbers with ellipsis for better UX
              if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage + 2)) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              } else if (i === currentPage - 3 || i === currentPage + 3) {
                return (
                  <span key={i} className="px-2 py-1 text-gray-400">
                    ...
                  </span>
                )
              }
              return null
            })}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-800 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
