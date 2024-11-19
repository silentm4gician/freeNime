import AnimeDetails from "@/components/AnimeDetails";
import { getAnimeID } from "@/app/api/requests";

async function getAnimeInfoGogo(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/info/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error("Failed to fetch anime info");
    return response.json();
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  // Obtener los datos del anime
  const animeData = await getAnimeInfoGogo(params.id);

  return {
    title: `${animeData?.title || "Unknown Anime"} - FreeNime`,
    description: `Stream ${
      animeData?.title || "this anime"
    } episodes online for free!`,
    extraData: animeData, // Pasamos los datos al componente
  };
}

export default async function AnimePage({ params, extraData }) {
  // const animeData = await getAnimeInfoGogo(params.id);
  const animeData = extraData || (await getAnimeInfoGogo(params.id));
  const TMDBID = await getAnimeID(animeData?.otherName, animeData?.releaseDate);

  if (!animeData) {
    return (
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold text-red-500">
          Anime not found or unavailable
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      <AnimeDetails anime={animeData} TMDBID={TMDBID} />
    </div>
  );
}
