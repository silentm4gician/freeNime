import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimeHeader from "../../../components/anime/anime-header";
import AnimeDetails from "../../../components/anime/anime-details";
import CharactersList from "../../../components/anime/characters-list";
import SeasonsList from "../../../components/anime/seasons-list";
import RelatedAnimeList from "../../../components/anime/related-anime-list";
import RecommendedAnimeList from "../../../components/anime/recommended-anime-list";
import VideoSection from "../../../components/anime/video-section";
import EpisodesList from "../../../components/anime/episodes-list";

export default async function AnimePage({ params }) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const { id } = await params;
  const response = await fetch(`${baseURL}/anime/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  if (data.status !== 200 || !data.data.anime) {
    notFound();
  }

  // Fetch episodes data
  const episodesResponse = await fetch(`${baseURL}/anime/${id}/episodes`, {
    next: { revalidate: 3600 },
  });

  let episodesData = null;
  if (episodesResponse.ok) {
    const episodesJson = await episodesResponse.json();
    if (episodesJson.status === 200) {
      episodesData = episodesJson.data;
    }
  }

  const {
    anime,
    seasons,
    relatedAnimes,
    recommendedAnimes,
    mostPopularAnimes,
  } = data.data;

  return (
    <main className="min-h-screen bg-gray-950">
      <AnimeHeader anime={anime.info} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Episodes List - New Section */}
            {episodesData &&
              episodesData.episodes &&
              episodesData.episodes.length > 0 && (
                <EpisodesList
                  animeId={id}
                  episodes={episodesData.episodes}
                  totalEpisodes={episodesData.totalEpisodes}
                />
              )}

            <AnimeDetails anime={anime} />

            {anime.info.promotionalVideos &&
              anime.info.promotionalVideos.length > 0 && (
                <VideoSection videos={anime.info.promotionalVideos} />
              )}

            {anime.info.charactersVoiceActors &&
              anime.info.charactersVoiceActors.length > 0 && (
                <CharactersList characters={anime.info.charactersVoiceActors} />
              )}

            {relatedAnimes && relatedAnimes.length > 0 && (
              <RelatedAnimeList animes={relatedAnimes} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {seasons && seasons.length > 0 && <SeasonsList seasons={seasons} />}

            {recommendedAnimes && recommendedAnimes.length > 0 && (
              <RecommendedAnimeList animes={recommendedAnimes.slice(0, 5)} />
            )}

            {mostPopularAnimes && mostPopularAnimes.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Popular Anime
                </h3>
                <div className="space-y-4">
                  {mostPopularAnimes.slice(0, 5).map((anime) => (
                    <Link
                      key={anime.id}
                      href={`/anime/${anime.id}`}
                      className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                      <div className="relative w-12 h-16 flex-shrink-0">
                        <Image
                          src={anime.poster || "/placeholder.svg"}
                          alt={anime.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white line-clamp-1">
                          {anime.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {anime.type} • {anime.episodes.sub} Eps
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
