"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import Pagination from "./Pagination";
import LoadingScreen from "./LoadingScreen";

export default function RecentEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEpisodes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/recent-episodes?page=${currentPage}`
        );
        const data = await response.json();
        setEpisodes(data.results || []);
        setHasNextPage(data.hasNextPage || false);
      } catch (error) {
        console.error("Error fetching recent episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEpisodes();
  }, [currentPage]);

  if (loading) {
    return <LoadingScreen message="Loading recent episodes..." />;
  }

  if (!episodes?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No recent episodes available</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-500">Recent Episodes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {episodes.map((episode) => (
          <Link
            key={episode.episodeId}
            href={`/watch/${episode.episodeId}`}
            className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
          >
            <div className="aspect-video relative">
              <img
                src={episode.image}
                alt={episode.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="h-12 w-12 text-purple-500" />
              </div>
              <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500 rounded text-sm font-semibold">
                EP {episode.episodeNumber}
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                {episode.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
