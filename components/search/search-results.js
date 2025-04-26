"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Info } from "lucide-react"

export default function SearchResults({ animes, currentPage, totalPages, query }) {
  const [sortBy, setSortBy] = useState("relevance")

  // Sort animes based on selected option
  const sortedAnimes = [...animes].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "episodes":
        return (b.episodes.sub || 0) - (a.episodes.sub || 0)
      case "newest":
        // This is a mock sort since we don't have release date
        return b.id.localeCompare(a.id)
      default:
        // Default is relevance, which is the original order
        return 0
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Results</h2>

        <div className="flex items-center">
          <label htmlFor="sort" className="text-gray-400 mr-2 text-sm">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="relevance">Relevance</option>
            <option value="name">Name</option>
            <option value="episodes">Episodes</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {sortedAnimes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No results found for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedAnimes.map((anime) => (
            <div key={anime.id} className="anime-card">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-purple-900/20 h-full flex flex-col">
                <div className="relative h-[240px] overflow-hidden">
                  <Image src={anime.poster || "/placeholder.svg"} alt={anime.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/watch/${anime.id}/episode/1`}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                    >
                      <Play size={18} className="text-white" />
                    </Link>
                    <Link
                      href={`/anime/${anime.id}`}
                      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Info size={18} className="text-white" />
                    </Link>
                  </div>

                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
                      {anime.type}
                    </span>
                    {anime.duration && (
                      <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
                        {anime.duration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 flex-grow flex flex-col">
                  <Link href={`/anime/${anime.id}`} className="hover:text-purple-400 transition-colors">
                    <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{anime.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{anime.jname}</p>

                  <div className="mt-auto flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      {anime.episodes && (
                        <>
                          <span className="text-purple-400">{anime.episodes.sub}</span> Episodes
                          {anime.episodes.dub && (
                            <span className="ml-2 bg-purple-900/30 text-purple-400 px-1.5 py-0.5 rounded text-[10px]">
                              DUB
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <Link
              href={`/search?q=${query}&page=${Math.max(1, currentPage - 1)}`}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              onClick={(e) => currentPage === 1 && e.preventDefault()}
            >
              Prev
            </Link>

            {[...Array(totalPages)].map((_, i) => (
              <Link
                key={i}
                href={`/search?q=${query}&page=${i + 1}`}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </Link>
            ))}

            <Link
              href={`/search?q=${query}&page=${Math.min(totalPages, currentPage + 1)}`}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              onClick={(e) => currentPage === totalPages && e.preventDefault()}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
