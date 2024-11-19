// hooks/useAnimeData.js
import { useState, useEffect } from "react";
import { getAnimeData } from "@/app/api/requests";

export function useAnimeData(TMDBID) {
  const [animeData, setAnimeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!TMDBID) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAnimeData(TMDBID);
        setAnimeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TMDBID]);

  return { animeData, isLoading, error };
}
