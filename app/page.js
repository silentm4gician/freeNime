import Hero from "../components/hero";
import SpotlightSection from "../components/spotlight-section";
import AnimeSection from "../components/anime-section";

export default async function Home() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  // Fetch data from the API
  const revalidateTime = process.env.NODE_ENV === "production" ? 3600 : false;
  const response = await fetch(`${baseURL}/home`, {
    next: { revalidate: revalidateTime },
  });
  const data = await response.json();

  if (!data.success) {
    return <div>Failed to load data</div>;
  }

  return (
    <main className="min-h-screen">
      {
        console.log('1')
      }
      <Hero spotlight={data.data.spotlightAnimes[0]} />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <SpotlightSection spotlightAnimes={data.data.spotlightAnimes} />

        <AnimeSection
          title="Trending Anime"
          animes={data.data.trendingAnimes}
          viewAllLink="/trending"
        />

        <AnimeSection
          title="Latest Episodes"
          animes={data.data.latestEpisodeAnimes}
          viewAllLink="/latest"
          showEpisodes={true}
        />

        <AnimeSection
          title="Top Airing Anime"
          animes={data.data.topAiringAnimes.slice(0, 10)}
          viewAllLink="/top-airing"
        />

        <AnimeSection
          title="Upcoming Anime"
          animes={data.data.topUpcomingAnimes.slice(0, 10)}
          viewAllLink="/upcoming"
          isUpcoming={true}
        />
      </div>
    </main>
  );
}
