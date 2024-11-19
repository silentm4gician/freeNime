import Link from "next/link";
import { Star, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AiringCard({ airing }) {
  const airingDate = new Date(airing.airingAt * 1000);
  const timeString = airingDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = airingDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const [match, setMatch] = useState();

  useEffect(() => {
    async function searchAnime(query) {
      // setIsLoading(true);
      // setError(null);

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
        // setError(error.message);
        setMatch(null);
      }
      // } finally {
      //   setIsLoading(false);
      // }
    }

    searchAnime(airing.title.userPreferred);
  });

  return (
    <>
      {match?.id != undefined ? (
        <Link
          href={`/anime/${match?.id}`}
          className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
        >
          <div className="aspect-video relative">
            <img
              src={airing.image}
              alt={airing.title.english || airing.title.romaji}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500 rounded text-sm font-semibold">
              EP {airing.episode}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-semibold line-clamp-2">
              {airing.title.english || airing.title.romaji}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{dateString}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{timeString}</span>
            </div>

            {airing.rating && (
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{airing.rating}%</span>
              </div>
            )}
          </div>
        </Link>
      ) : null}
    </>
  );
}
