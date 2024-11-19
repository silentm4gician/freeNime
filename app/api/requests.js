function cleanString(input) {
  return input.trim().replace(/\s+/g, " ");
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
};

export async function getAnimeID(otherName, releaseDate) {
  let TMDBID = 0;

  try {
    // Normalización de cadenas
    const normalizeString = (str) => str?.toLowerCase().trim(); // Elimina solo espacios iniciales y finales, conserva caracteres especiales

    const normalizedReleaseYear = releaseDate?.split("-")[0]?.trim();

    // Normalizamos y separamos nombres alternativos (manteniendo kanjis y caracteres no latinos)
    const alternateNames = (otherName || "")
      .split(",") // Separar por comas
      .map((name) => normalizeString(name)) // Quitar espacios al inicio y al final
      .filter((name) => name); // Filtrar nombres vacíos

    // Realizar la búsqueda en TMDB para cada nombre alternativo
    for (const searchName of alternateNames) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          searchName
        )}&include_adult=true&language=en-US&page=1`,
        options
      );
      const data = await res.json();

      if (!data || !Array.isArray(data.results)) {
        console.error("API response invalid or missing 'results':", data);
        continue; // Pasar al siguiente nombre alternativo
      }

      // 1. Coincidencia por año y géneros
      const matchByYearAndGenre = data.results.find((result) => {
        const firstAirYear = result.first_air_date?.split("-")[0]?.trim();
        const resultGenres = result.genre_ids || [];

        return (
          firstAirYear === normalizedReleaseYear && resultGenres.includes(16) // Género `16` (Animación)
        );
      });

      if (matchByYearAndGenre) {
        TMDBID = matchByYearAndGenre.id;
        return TMDBID;
      }

      // 2. Coincidencia exacta por nombre o nombres alternativos
      const matchByName = data.results.find((result) => {
        const normalizedName = normalizeString(result.name || "");
        const normalizedOriginalName = normalizeString(
          result.original_name || ""
        );

        return (
          alternateNames.includes(normalizedName) ||
          alternateNames.includes(normalizedOriginalName)
        );
      });

      if (matchByName) {
        TMDBID = matchByName.id;
        return TMDBID;
      }

      // 3. Fallback si hay un único resultado
      if (data.results.length === 1) {
        TMDBID = data.results[0].id;
        return TMDBID;
      }
    }
  } catch (error) {
    console.error("Error in getAnimeID:", error);
  }

  console.log("TMDBID Found:", TMDBID);
  return TMDBID; // Devuelve 0 si no hubo match
}

export async function getAnimeData(id) {
  let animeData = {};

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=us-EN`,
      options
    );
    const data = await response.json();
    animeData = data;
  } catch (err) {
    console.error(err);
  }

  return animeData;
}

export async function getSeasonData(id, season) {
  let seasonData = {};

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`,
      options
    );
    const data = await response.json();
    seasonData = data;
  } catch (err) {
    console.error(err);
  }

  return seasonData;
}

export async function getRecomendations(query) {
  let recs = [];
  const toSearch = query.length > 30 ? query.slice(0, 30) : query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/${toSearch}`
    );
    const data = await response.json();
    recs = data.results;
  } catch (err) {
    console.error(err);
  }

  return recs;
}
