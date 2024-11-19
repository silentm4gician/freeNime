"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";
import { Loader2 } from "lucide-react";

function extractYear(text) {
  const match = text.match(/\b\d{4}\b/);
  return match ? match[0] : null;
}

export default function SearchResults({ params }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const query = decodeURIComponent(params.query);

  useEffect(() => {
    const resultsGogoanime = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/${encodeURIComponent(
            query
          )}?page=${currentPage}`
        );
        const data = await res.json();
        setHasNextPage(data.hasNextPage || false);
        setResults(
          data.results.filter((serie) => serie.releaseDate != "") || []
        );
      } catch (error) {
        toast.error("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    resultsGogoanime();
  }, [query, currentPage]);

  if (loading)
    return (
      <div className="flex flex-col gap-2 justify-center items-center pt-32">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-xl italic font-semibold text-gray-400">
          Searching...
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 pt-20 pb-2">
      <h1 className="text-2xl font-bold mb-4">
        {results.length != 0
          ? `Search Results for "${query}"`
          : `No results for "${query}", try again...`}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results.map((anime) => (
          <Link
            key={anime.id}
            href={`/anime/${anime.id}`}
            className="group overflow-hidden rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={anime.image}
                alt={anime.title.english || anime.title.romaji || anime.id}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                {anime.title.english || anime.title.romaji || anime.title}
              </h2>
              <p className="text-sm text-gray-400">
                {extractYear(anime.releaseDate)}
              </p>
              <div className="flex flex-wrap gap-2">
                {anime.genres != undefined ? (
                  anime.genres?.slice(0, 2).map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 text-xs bg-purple-900/50 rounded-full"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="px-2 py-1 text-sm bg-purple-900/50 rounded-full">
                    {anime.subOrDub}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {results.length != 0 ? (
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
