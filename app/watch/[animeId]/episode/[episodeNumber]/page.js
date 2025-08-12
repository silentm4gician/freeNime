import { notFound } from "next/navigation";
import VideoPlayer from "../../../../../components/video/video-player";
import EpisodeNavigation from "../../../../../components/video/episode-navigation";
import VideoInfo from "../../../../../components/video/video-info";
import RelatedInfo from "../../../../../components//video/related-info";

export default async function WatchPage({ params }) {
  const { animeId, episodeNumber } = await params;
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch anime data
  const animeResponse = await fetch(`${baseURL}/anime/${animeId}`, {
    next: { revalidate: 3600 },
  });

  if (!animeResponse.ok) {
    notFound();
  }

  const animeData = await animeResponse.json();

  if (animeData.status != 200 || !animeData.data.anime) {
    notFound();
  }

  // Fetch episodes data
  const episodesResponse = await fetch(`${baseURL}/anime/${animeId}/episodes`, {
    next: { revalidate: 3600 },
  });

  let episodesData = null;
  if (episodesResponse.ok) {
    const episodesJson = await episodesResponse.json();
    if (episodesJson.status === 200) {
      episodesData = episodesJson.data;
    }
  }

  // Find current episode
  const currentEpisode = episodesData?.episodes?.find(
    (ep) => ep.number === Number.parseInt(episodeNumber)
  );

  if (!currentEpisode) {
    notFound();
  }

  // Fetch episode sources
  const sourcesResponse = await fetch(
    `${baseURL}/episode/sources?animeEpisodeId=${currentEpisode.episodeId}&server=hd-2`,
    { next: { revalidate: 3600 } }
  );

  let sourcesData = null;
  if (sourcesResponse.ok) {
    const sourcesJson = await sourcesResponse.json();
    if (sourcesJson.status === 200) {
      sourcesData = sourcesJson.data;
    }
  }

  if (
    !sourcesData ||
    !sourcesData.sources ||
    sourcesData.sources.length === 0
  ) {
    return (
      <>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Video Source Not Available
          </h1>
          <p className="text-gray-400">
            Sorry, the video source for this episode is currently unavailable.
            Please try again later.
          </p>
        </div>
      </>
    );
  }

  // Find next and previous episodes
  const episodeIndex = episodesData.episodes.findIndex(
    (ep) => ep.number === Number.parseInt(episodeNumber)
  );

  const prevEpisode =
    episodeIndex > 0 ? episodesData.episodes[episodeIndex - 1] : null;
  const nextEpisode =
    episodeIndex < episodesData.episodes.length - 1
      ? episodesData.episodes[episodeIndex + 1]
      : null;

  const animeInfo = animeData.data.anime.info;

  return (
    <main className="min-h-screen bg-gray-950 pb-16">
      <div className="container mx-auto px-4">
        {/* Video Player */}
        <div className="mt-4 bg-black rounded-lg overflow-hidden shadow-xl">
          <VideoPlayer
            sources={sourcesData.sources}
            tracks={sourcesData.tracks}
            intro={sourcesData.intro}
            outro={sourcesData.outro}
            poster={animeInfo.poster}
            episodeTitle={currentEpisode.title}
            episodeNumber={currentEpisode.number}
          />
        </div>

        {/* Episode Navigation */}
        <EpisodeNavigation
          animeId={animeId}
          currentEpisode={currentEpisode}
          prevEpisode={prevEpisode}
          nextEpisode={nextEpisode}
          totalEpisodes={episodesData.totalEpisodes}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <VideoInfo
              anime={animeInfo}
              episode={currentEpisode}
              episodeNumber={Number.parseInt(episodeNumber)}
            />

            {/* More components can be added here like comments, etc. */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <RelatedInfo
              animeId={animeId}
              episodes={episodesData.episodes}
              currentEpisodeNumber={Number.parseInt(episodeNumber)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
