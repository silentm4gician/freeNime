// components/AnimeDetails.jsx
"use client";

import { useState, useEffect } from "react";
import {
  getAnimeData,
  getRecomendations,
  getSeasonData,
} from "@/app/api/requests";
import { AnimeHeader } from "./AnimeHeader";
import SeasonCarousel from "./SeasonCarousel";
import { EpisodeList } from "./EpisodeList";
import { RecommendationsList } from "./RecomendationsList";

function removeSpecificCharacters(input) {
  return input.replace(/[():]/g, "");
}

export default function AnimeDetails({ anime, TMDBID }) {
  const [activeTab, setActiveTab] = useState("episodes");
  const [episodes, setEpisodes] = useState(anime.episodes);
  const [episodesData, setEpisodesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animeData, setAnimeData] = useState({});
  const [formatedEP, setFormatedEP] = useState([]);
  const [season, setSeason] = useState(1);
  const [seasonData, setSeasonData] = useState({});
  const [match, setMatch] = useState([]);
  const [isTheAnime, setIsTheAnime] = useState(true);
  const [recs, setRecs] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!animeData?.name) return;

    const temporada = animeData.seasons.find(
      (season) => season.season_number == 1
    );
    if (temporada.episode_count > 40) return;

    async function searchAnime(query) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/${query}`,
          { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch anime info: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.results?.length) {
          throw new Error("No results found");
        }

        const queryWords = query.toLowerCase().split(" ");

        // Primero buscar coincidencia exacta
        const exactMatch = data.results.find(
          (result) => result.title.toLowerCase() === query.toLowerCase()
        );

        // Si no hay coincidencia exacta, buscar coincidencia parcial
        const partialMatch = data.results.find((result) => {
          const titleWords = result.title.toLowerCase().split(" ");
          return queryWords.some(
            (word) => titleWords.includes(word) && word.length > 2
          );
        });

        setMatch(exactMatch || partialMatch || data.results[0]);
      } catch (error) {
        console.error("Error fetching anime info:", error);
        setError(error.message);
        setMatch(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (season != 1) {
      const title =
        animeData.name.length > 10
          ? animeData.name.split(" ")[0]
          : animeData.name;

      const query = animeData.seasons[season].name.includes("Season")
        ? // animeData.seasons[1].name.includes("Season")
          `${removeSpecificCharacters(title)} ${season}`
        : removeSpecificCharacters(animeData.seasons[season].name);

      searchAnime(query);
    } else {
      searchAnime(animeData.name);
    }
  }, [animeData?.seasons, animeData?.name, season]);

  // Fetch episodes when we have a match
  useEffect(() => {
    if (!match?.id) return;

    async function getEpisodesLinks(id) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/info/${id}`,
          { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch episodes: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.episodes) {
          throw new Error("No episodes found");
        }

        setEpisodes(data.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setError(error.message);
        setEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    }

    getEpisodesLinks(match.id);
  }, [match?.id]);

  useEffect(() => {
    if (!TMDBID) return;

    const getData = async () => {
      setIsLoading(true);
      const data = await getAnimeData(TMDBID);
      if (anime.releaseDate != data.first_air_date.split("-")[0]?.trim()) {
        setIsTheAnime(false);
        return;
      } else {
        setAnimeData(data);
      }
      setIsLoading(false);
    };

    const getEpisodes = async () => {
      if (!isTheAnime) return;
      else {
        setIsLoading(true);
        const data = await getSeasonData(TMDBID, season);
        setSeasonData(data);
        setEpisodesData(data.episodes);
        setIsLoading(false);
      }
    };

    const getRecs = async () => {
      setIsLoading(true);
      const data = await getRecomendations(anime.title);
      setRecs(data);
      setIsLoading(false);
    };

    getData();
    getEpisodes();
    getRecs();
  }, [season, TMDBID, anime.releaseDate, anime.title, isTheAnime]);

  useEffect(() => {
    if (episodes) {
      const mergedEpisodes = (episodesData.length > 0 ? episodesData : episodes)
        .map((epData) => {
          const epMatch = episodes.find(
            (ep) => ep.number === (epData.episode_number || epData.number)
          );

          if (!epMatch && episodesData.length === 0) {
            return {
              id: epData.id,
              number: epData.number,
              name: `Episode ${epData.number}`,
              image: anime.image,
              vote_average: null,
              air_date: null,
            };
          }
          return {
            id: epMatch ? epMatch.id : null,
            number: epData.episode_number || epData.number,
            name: epData.name || epMatch?.name,
            image: `${baseURL}${epData.still_path || epMatch?.still_path}`,
            vote_average: epData.vote_average || epMatch?.vote_average,
            air_date: epData.air_date || epMatch?.air_date,
          };
        })
        .filter((ep) => ep.id !== null); // Filtrar episodios con id null

      setFormatedEP(mergedEpisodes);
    }
  }, [episodes, episodesData, season, anime.image]);

  if (!anime) return null;

  return (
    <div className="container mx-auto px-1 py-4">
      <AnimeHeader anime={anime} animeData={animeData} />

      <div className="flex gap-4 mb-6 border-b border-gray-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab("episodes")}
          className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "episodes"
              ? "text-purple-500 border-b-2 border-purple-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Episodes
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "recommendations"
              ? "text-purple-500 border-b-2 border-purple-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Related
        </button>
      </div>

      {activeTab === "episodes" && (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : formatedEP.length > 0 ? (
            <>
              <SeasonCarousel
                animeData={animeData}
                season={season}
                setSeason={setSeason}
              />
              <EpisodeList
                formatedEP={formatedEP}
                animeData={animeData}
                anime={anime}
              />
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No episodes available
            </div>
          )}
        </div>
      )}

      {activeTab === "recommendations" && <RecommendationsList recs={recs} />}
    </div>
  );
}
