import { notFound } from "next/navigation";
import SearchResults from "../../components/search/search-results";
import PopularAnime from "../../components/search/popular-anime";
import SearchFilters from "../../components/search/search-filters";

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const { page } = (await searchParams) || "1";
  const params = await searchParams;
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!q?.trim()) {
    notFound();
  }

  // Build the API URL with all search parameters
  let apiUrl = `${baseURL}/search?q=${encodeURIComponent(q)}&page=${page}`;

  // Add all other search parameters if they exist
  const validParams = [
    "genres",
    "type",
    "sort",
    "season",
    "language",
    "status",
    "rated",
    "start_date",
    "end_date",
    "score",
  ];

  validParams.forEach((param) => {
    if (params[param]) {
      apiUrl += `&${param}=${encodeURIComponent(params[param])}`;
    }
  });

  // Fetch search results from API
  const response = await fetch(apiUrl, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Search Error</h1>
        <p className="text-gray-400">
          Sorry, we encountered an error while searching. Please try again
          later.
        </p>
      </div>
    );
  }

  const data = await response.json();

  const {
    animes,
    mostPopularAnimes,
    searchQuery,
    totalPages,
    currentPage,
    searchFilters,
  } = data.data;

  return (
    <main className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <SearchFilters />

            {/* Popular Anime Section */}
            {mostPopularAnimes && mostPopularAnimes.length > 0 && (
              <div className="mt-8">
                <PopularAnime animes={mostPopularAnimes} />
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {q && (
              <SearchResults
                animes={animes}
                currentPage={currentPage}
                totalPages={totalPages}
                query={searchQuery}
                searchParams={params}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
