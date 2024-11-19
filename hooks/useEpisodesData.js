// hooks/useEpisodesData.js
import { useState, useEffect } from "react";
import { getSeasonData } from "@/app/api/requests";

export function useEpisodesData(animeData, season, TMDBID) {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!animeData?.name) return;

    const fetchEpisodes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch gogoanime episodes
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/${
            season !== 1 ? `${animeData.name} ${season}` : animeData.name
          }`,
          { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch anime info: ${response.status}`);
        }

        const data = await response.json();
        if (!data?.results?.length) {
          throw new Error("No results found");
        }

        // Fetch detailed episode info from gogoanime
        const episodesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/info/${data.results[0].id}`,
          { next: { revalidate: 3600 } }
        );

        if (!episodesResponse.ok) {
          throw new Error(
            `Failed to fetch episodes: ${episodesResponse.status}`
          );
        }

        const gogoEpisodes = await episodesResponse.json();

        // Fetch TMDB season data if TMDBID exists
        let tmdbEpisodesData = [];
        if (TMDBID) {
          const seasonData = await getSeasonData(TMDBID, season);
          tmdbEpisodesData = seasonData.episodes || [];
        }

        // Merge episodes data
        const mergedEpisodes = (
          tmdbEpisodesData.length > 0 ? tmdbEpisodesData : gogoEpisodes.episodes
        )
          .map((epData) => {
            const epMatch = gogoEpisodes.episodes.find(
              (ep) => ep.number === (epData.episode_number || epData.number)
            );

            if (!epMatch && tmdbEpisodesData.length === 0) {
              return {
                id: epData.id,
                number: epData.number,
                name: `Episode ${epData.number}`,
                image: null,
                vote_average: null,
                air_date: null,
              };
            }

            return {
              id: epMatch ? epMatch.id : null,
              number: epData.episode_number || epData.number,
              name:
                epData.name ||
                epMatch?.name ||
                `Episode ${epData.number || epData.episode_number}`,
              image: epData.still_path
                ? `${baseURL}${epData.still_path}`
                : null,
              vote_average: epData.vote_average || epMatch?.vote_average,
              air_date: epData.air_date || epMatch?.air_date,
            };
          })
          .filter((ep) => ep.id !== null);

        setEpisodes(mergedEpisodes);
      } catch (err) {
        setError(err.message);
        setEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [animeData?.name, season, TMDBID]);

  return { episodes, isLoading, error };
}
