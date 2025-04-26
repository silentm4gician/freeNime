"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Info } from "lucide-react";

export default function SearchResults({
  animes,
  currentPage,
  totalPages,
  query,
  searchParams,
}) {
  if (!animes || animes.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 border border-purple-900/20 text-center">
        <h2 className="text-xl font-bold text-white mb-4">No Results Found</h2>
        <p className="text-gray-400 mb-6">
          We couldn't find any anime matching your search criteria. Try
          adjusting your filters or search with different keywords.
        </p>
        <Link
          href={`/search?q=${query}`}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full transition-colors inline-block"
        >
          Clear Filters
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Results</h2>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.map((anime) => (
          <div key={anime.id} className="anime-card">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-purple-900/20 h-full flex flex-col">
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src={anime.poster || "/placeholder.svg"}
                  alt={anime.name}
                  fill
                  className="object-cover"
                />
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
                <Link
                  href={`/anime/${anime.id}`}
                  className="hover:text-purple-400 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                    {anime.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                  {anime.jname}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    {anime.episodes && (
                      <>
                        <span className="text-purple-400">
                          {anime.episodes.sub}
                        </span>{" "}
                        Episodes
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <PaginationLink
              page={Math.max(1, currentPage - 1)}
              disabled={currentPage === 1}
              searchParams={searchParams}
            >
              Prev
            </PaginationLink>

            {generatePaginationLinks(currentPage, totalPages).map(
              (pageNum, i) =>
                pageNum === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 py-1 text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <PaginationLink
                    key={pageNum}
                    page={pageNum}
                    isActive={currentPage === pageNum}
                    searchParams={searchParams}
                  />
                )
            )}

            <PaginationLink
              page={Math.min(totalPages, currentPage + 1)}
              disabled={currentPage === totalPages}
              searchParams={searchParams}
            >
              Next
            </PaginationLink>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to generate pagination links with ellipsis for large page counts
function generatePaginationLinks(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

// Pagination link component that preserves all search parameters
function PaginationLink({ page, children, isActive, disabled, searchParams }) {
  // Create a copy of the search params
  const params = new URLSearchParams();

  // Add all existing search params except page
  for (const [key, value] of Object.entries(searchParams)) {
    if (key !== "page") {
      params.set(key, value);
    }
  }

  // Add the new page parameter
  params.set("page", page);

  // Build the URL
  const href = `/search?${params.toString()}`;

  // If disabled, render a button instead of a link
  if (disabled) {
    return (
      <button
        className="px-3 py-1 rounded-md bg-gray-800 text-gray-500 cursor-not-allowed"
        disabled
      >
        {children || page}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`px-3 py-1 rounded-md ${
        isActive
          ? "bg-purple-600 text-white"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      {children || page}
    </Link>
  );
}
