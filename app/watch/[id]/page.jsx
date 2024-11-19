"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeControls from "@/components/EpisodeControls";
import EpisodeRange from "@/components/EpisodeRange";
import LoadingScreen from "@/components/LoadingScreen";

export default function WatchPage({ params }) {
  const router = useRouter();
  const [episodeData, setEpisodeData] = useState(null);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAnime, setCurrentAnime] = useState([]);

  const currentEpisodeNumber = parseInt(params.id.split("-episode-")[1]);
  const gogoAnimeId = params.id.split("-episode-")[0];

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const gogoResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/watch/${params.id}`
        );
        if (!gogoResponse.ok) throw new Error("Failed to fetch episode");
        const data = await gogoResponse.json();

        setEpisodeData(data);

        const animeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/info/${gogoAnimeId}`
        );

        if (animeResponse.ok) {
          const animeData = await animeResponse.json();
          document.title = `${animeData.title} - Episode ${currentEpisodeNumber} - FreeNime`;
          setAllEpisodes(animeData.episodes || []);
          setCurrentAnime(animeData || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [params.id,currentEpisodeNumber,gogoAnimeId]);

  const handlePrevious = () => {
    const prevEpisode = allEpisodes.find(
      (ep) => ep.number === currentEpisodeNumber - 1
    );
    if (prevEpisode) {
      router.push(`/watch/${prevEpisode.id}`);
    }
  };

  const handleNext = () => {
    const nextEpisode = allEpisodes.find(
      (ep) => ep.number === currentEpisodeNumber + 1
    );
    if (nextEpisode) {
      router.push(`/watch/${nextEpisode.id}`);
    }
  };

  const handleDownload = () => {
    if (episodeData?.download) {
      window.open(episodeData.download, "_blank");
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading episode..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 max-w-[1600px] pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <VideoPlayer episodeData={episodeData} />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <h1 className="text-2xl font-bold bg-gray-900 px-4 py-2 mt-5 rounded-lg text-center md:max-w-md">
              {currentAnime.title} - Episode {currentEpisodeNumber}
            </h1>
            <EpisodeControls
              onPrevious={handlePrevious}
              onNext={handleNext}
              onDownload={handleDownload}
              hasPrevious={allEpisodes.some(
                (ep) => ep.number === currentEpisodeNumber - 1
              )}
              hasNext={allEpisodes.some(
                (ep) => ep.number === currentEpisodeNumber + 1
              )}
              hasDownload={!!episodeData?.download}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Anime Details Link */}
          {gogoAnimeId && (
            <div className="overflow-hidden rounded-lg bg-gray-900 shadow-lg">
              <div className="relative aspect-video">
                <img
                  src={
                    currentAnime.image ||
                    "/placeholder.svg?height=200&width=356"
                  }
                  alt={`Cover image for ${currentAnime.title}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-2 left-2 right-2 text-white font-bold text-lg line-clamp-2">
                  {currentAnime.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-300 line-clamp-3">
                  {currentAnime.description || "No description available."}
                </p>
              </div>
              <div className="px-4 pb-4">
                <Link
                  href={`/anime/${gogoAnimeId}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                  <Info className="w-5 h-5" />
                  Anime Details
                </Link>
              </div>
            </div>
          )}

          {/* Episode Controls */}
          <div className=" rounded-lg space-y-4">
            <EpisodeRange
              episodes={allEpisodes}
              currentEpisode={currentEpisodeNumber}
              range={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
