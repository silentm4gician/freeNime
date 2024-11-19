// components/AnimeHeader.jsx
import React from "react";
import { Film, Star, Clock, Calendar } from "lucide-react";

function clearText(text) {
  let clearText = text.replace(/<[^>]*>/g, "");
  clearText = clearText.replace(/\n\s*\n/g, "\n").trim();
  return clearText;
}

export function AnimeHeader({ anime, animeData }) {
  const baseURL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="relative min-h-[500px] sm:min-h-[400px] rounded-xl overflow-hidden mb-6 sm:mb-8">
      <img
        src={
          animeData.name
            ? `${baseURL}${animeData?.backdrop_path}`
            : "/cover.jpg"
        }
        alt="anime cover image"
        className="w-full h-[500px] sm:h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <img
            src={
              animeData.name
                ? `${baseURL}${animeData?.poster_path}`
                : anime.image
            }
            alt="anime poster image"
            className="w-32 sm:w-40 md:w-48 rounded-lg shadow-lg"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {animeData.name
                ? animeData?.name || animeData?.original_name
                : anime.title}
            </h1>
            {animeData?.original_name && (
              <h2 className="text-lg sm:text-xl text-gray-400 mb-2 sm:mb-4">
                {animeData?.original_name}
              </h2>
            )}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              {anime.status && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Film className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">{anime.status}</span>
                </div>
              )}
              {animeData?.vote_average && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className="text-sm sm:text-base">
                    {animeData?.vote_average}/10
                  </span>
                </div>
              )}
              {animeData?.episode_run_time && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">
                    {animeData?.episode_run_time} min
                  </span>
                </div>
              )}
              {anime.releaseDate && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">
                    {anime.releaseDate}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
              {anime.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-2 sm:px-3 py-1 bg-purple-500/20 rounded-full text-xs sm:text-sm text-purple-300"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
              {animeData?.overview || clearText(anime.description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
