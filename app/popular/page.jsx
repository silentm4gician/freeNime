"use client";

import { useState, useEffect } from "react";
import AnimeGrid from "@/components/AnimeGrid";
import Pagination from "@/components/Pagination";
import { Loader2 } from "lucide-react";

export default function PopularPage() {
  const [animes, setAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/popular?page=${currentPage}`
        );
        const data = await response.json();
        setAnimes(data.results || []);
        setHasNextPage(data.hasNextPage || false);
      } catch (error) {
        console.error("Error fetching popular anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularAnime();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 mb-4">
      <h1 className="text-3xl font-bold mb-8">Popular Anime</h1>
      <AnimeGrid animes={animes} />
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
