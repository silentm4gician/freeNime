"use client";

import { useAnimeAPI } from "@/hooks/useAnimeAPI";
import VideoPlayer from "@/components/VideoPlayer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ChevronLeft, ChevronRight, List, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { use } from "react";

export default function WatchPage({ params }) {
  const { animeId, episodeId } = use(params);
  const [showEpisodeList, setShowEpisodeList] = useState(true);
  const [source, setSource] = useState(0);

  const { data: animeData, loading: animeLoading } = useAnimeAPI(
    `/anime?url=https://monoschino2.com/${animeId}`
  );
  const { data: streamData, loading: streamLoading } = useAnimeAPI(
    `/watch?url=https://monoschino2.com/ver//${episodeId}`
  );

  const episodes = animeData?.episodes || [];
  const currentEpisodeIndex = episodes.findIndex((ep) => {
    return (
      String(ep.id) === String(episodeId) ||
      String(ep.number) === String(episodeId)
    );
  });
  const currentEpisode = episodes[currentEpisodeIndex];
  const prevEpisode = episodes[currentEpisodeIndex - 1];
  const nextEpisode = episodes[currentEpisodeIndex + 1];

  const cleanVideoUrl = (url) => {
    if (!url) return null;
    // Remove everything after the file extension
    return url.replace(/\?.*$/, "");
  };

  const hasDirectVideoUrl = !!streamData?.iframe.directVideoUrl;
  const videoSource =
    cleanVideoUrl(streamData?.iframe.directVideoUrl) ||
    streamData?.iframe.videoSources[source].src;

  if (animeLoading || streamLoading) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSkeleton type="hero" />
          <div className="mt-6 space-y-4">
            <div className="h-6 bg-secondary rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-secondary rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!streamData || !currentEpisode) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Episode not found
          </h1>
          <p className="text-muted-foreground mb-4">
            The episode you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              src={videoSource}
              hasDirectVideoUrl={hasDirectVideoUrl}
            />

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Seleccionar Servidor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                  {streamData?.iframe.videoSources.map((source, index) => (
                    <Button
                      key={index}
                      variant={source === videoSource ? "default" : "outline"}
                      onClick={() => setSource(index)}
                      className="cursor-pointer"
                    >
                      {streamData?.iframe.servers[index].name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Episode Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Link
                      href={`/anime/${animeId}`}
                      className="text-sm text-primary hover:underline mb-2 block"
                    >
                      ← Volver a {animeData.title}
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Episodio {currentEpisode.number}
                    </h1>
                    {animeData.extraInfo.format && (
                      <Badge className="bg-primary text-black">
                        {animeData.extraInfo.format}
                      </Badge>
                    )}
                  </div>
                </div>

                {currentEpisode.description && (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {currentEpisode.description}
                  </p>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  {prevEpisode ? (
                    <Button asChild variant="outline">
                      <Link
                        href={`/watch/${animeId}/${
                          prevEpisode.id || prevEpisode.number
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>
                  )}

                  {nextEpisode ? (
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-black"
                    >
                      <Link
                        href={`/watch/${animeId}/${
                          nextEpisode.id || nextEpisode.number
                        }`}
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled>
                      Siguiente
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setShowEpisodeList(!showEpisodeList)}
                    className="lg:hidden"
                  >
                    <List className="w-4 h-4 mr-2" />
                    Episodios
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Anime Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">
                    Acerca de {animeData.title}
                  </h2>
                </div>
                {animeData.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {animeData.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Episode List Sidebar */}
          <div className={showEpisodeList ? "block" : "hidden lg:block"}>
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-foreground mb-4 text-center">
                  Episodios
                </h2>
                {streamLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-20 bg-secondary rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar">
                    {episodes.map((episode) => {
                      const isActive =
                        String(episode.id) === String(episodeId) ||
                        String(episode.number) === String(episodeId);
                      return (
                        <Link
                          key={episode.id || episode.number}
                          href={`/watch/${animeId}/${
                            episode.id || episode.number
                          }`}
                        >
                          <Card
                            className={
                              isActive
                                ? "group hover:ring-2 hover:ring-primary transition-all ring-2 ring-primary bg-primary/10 m-2"
                                : "group hover:ring-2 hover:ring-primary transition-all m-2"
                            }
                          >
                            <CardContent className="p-3 flex gap-3">
                              <div className="relative w-1/2 shrink-0 aspect-video overflow-hidden rounded">
                                <img
                                  src={
                                    episode.image ||
                                    animeData.image ||
                                    "/placeholder.svg?height=90&width=160&query=episode"
                                  }
                                  alt={`Episodio ${episode.number}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground line-clamp-1">
                                  Episodio {episode.number}
                                </p>
                                {episode.title && (
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {episode.title}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
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
