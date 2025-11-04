"use client";

import { useAnimeAPI } from "@/hooks/useAnimeAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Play, Calendar, Tv, Info, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

export default function AnimeDetailPage({ params }) {
  const { id } = use(params);
  const { data: animeData, loading: animeLoading } = useAnimeAPI(
    `/anime?url=https://monoschino2.com/${id}`
  );
  const episodes = animeData?.episodes || [];
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 12; // 12 episodes per page

  // Calculate total pages
  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  
  // Get current episodes
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  if (animeLoading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="relative h-[400px] md:h-[500px]">
          <LoadingSkeleton type="hero" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-secondary rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-secondary rounded w-full animate-pulse" />
              <div className="h-4 bg-secondary rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!animeData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Anime not found
          </h1>
          <p className="text-muted-foreground mb-4">
            The anime you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              animeData.image ||
              "/placeholder.svg?height=500&width=1200&query=anime banner"
            }
            alt={animeData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="shrink-0">
              <img
                src={
                  animeData.image ||
                  "/placeholder.svg?height=300&width=200&query=anime poster"
                }
                alt={animeData.title}
                className="w-40 md:w-48 rounded-xl shadow-2xl border-2 border-border"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {animeData.extraInfo.format && (
                  <Badge className="bg-primary text-black font-semibold">
                    {animeData.extraInfo.format}
                  </Badge>
                )}
                {animeData.extraInfo.status && (
                  <Badge variant="outline">{animeData.extraInfo.status}</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
                {animeData.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                {animeData.extraInfo.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{animeData.extraInfo.year}</span>
                  </div>
                )}
                {animeData.extraInfo.totalEpisodes && (
                  <div className="flex items-center gap-1">
                    <Tv className="w-4 h-4" />
                    <span>{animeData.extraInfo.totalEpisodes} Episodes</span>
                  </div>
                )}
              </div>
              {episodes.length > 0 && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black font-semibold"
                >
                  <Link
                    href={`/watch/${id}/${
                      episodes[0].id || episodes[0].number || 1
                    }`}
                  >
                    <Play className="w-5 h-5 mr-2 fill-black" />
                    Ver Episodio 1
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {animeData.description && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">
                      Sinopsis
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {animeData.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Episodes */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tv className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">
                    Capitulos
                  </h2>
                </div>
                {animeLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <LoadingSkeleton key={i} type="episode" />
                    ))}
                  </div>
                ) : episodes.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {currentEpisodes.map((episode) => (
                      <Link
                        key={episode.id || episode.number}
                        href={`/watch/${id}/${episode.id}`}
                      >
                        <Card className="group hover:ring-2 hover:ring-primary transition-all">
                          <div className="relative aspect-video overflow-hidden rounded-t-xl">
                            <img
                              src={
                                episode.image ||
                                animeData.image ||
                                "/placeholder.svg?height=180&width=320&query=episode"
                              }
                              alt={episode.title || `Episode ${episode.number}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <p className="text-sm font-semibold text-foreground line-clamp-1">
                              EP {episode.number}
                            </p>
                            {episode.title && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {episode.title}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={firstPage}
                          disabled={currentPage === 1}
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={prevPage}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          // Show pages around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => paginate(pageNum)}
                              className="w-10 h-10 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={lastPage}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No capítulos disponibles
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-foreground">Información</h3>
                <Separator />
                {animeData.genres && animeData.genres.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Generos</p>
                    <div className="flex flex-wrap gap-2">
                      {animeData.genres.map((genre, index) => (
                        <Badge key={index} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {animeData.extraInfo.year && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Fecha de lanzamiento
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {animeData.extraInfo.year}
                    </p>
                  </div>
                )}
                {animeData.extraInfo.totalEpisodes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total de capítulos
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {animeData.extraInfo.totalEpisodes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
