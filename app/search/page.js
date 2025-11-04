"use client";

import { useSearchParams } from "next/navigation";
import { useAnimeAPI } from "@/hooks/useAnimeAPI";
import { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimeGrid from "@/components/AnimeGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);

  const { data: searchData, loading: searchLoading } = useAnimeAPI(
    activeQuery ? `/search?q=${encodeURIComponent(activeQuery)}` : null
  );

  useEffect(() => {
    setSearchQuery(queryParam);
    setActiveQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveQuery("");
    router.push("/search");
  };

  const results = searchData?.results || searchData || [];

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <SectionTitle>Buscar anime</SectionTitle>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar anime..."
                className="pl-10 pr-10 h-12 text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-semibold cursor-pointer"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </form>

          {/* Search Info */}
          {activeQuery && (
            <div className="flex items-center justify-between">
              {searchLoading ? (
                <p className="text-muted-foreground">Buscando...</p>
              ) : (
                <p className="text-muted-foreground">
                  Encontrados{" "}
                  <span className="font-semibold text-foreground">
                    {results.length}
                  </span>{" "}
                  resultados para{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{activeQuery}&quot;
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {!activeQuery && !searchLoading ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Buscar anime
            </h2>
            <p className="text-muted-foreground">
              Introduce un titulo, genero o keyword para encontrar tu anime
              favorito
            </p>
          </div>
        ) : (
          <AnimeGrid animes={results} loading={searchLoading} columns={6} />
        )}
      </div>
    </div>
  );
}
