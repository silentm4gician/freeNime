"use client";

import { useState, useEffect } from "react";
import AiringSchedule from "@/components/AiringSchedule";
import Pagination from "@/components/Pagination";
import { Loader2 } from "lucide-react";

export default function AiringPage() {
  const [airings, setAirings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiringSchedule = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/meta/anilist/airing-schedule?page=${currentPage}`
        );
        const data = await response.json();
        setAirings(data.results || []);
        setHasNextPage(data.hasNextPage || false);
      } catch (error) {
        console.error("Error fetching airing schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiringSchedule();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-4">
      <h1 className="text-3xl font-bold mb-4">Airing Schedule</h1>
      <AiringSchedule
        airings={airings}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
