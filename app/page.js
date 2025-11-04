"use client";

import { useAnimeAPI } from "@/hooks/useAnimeAPI";
import SectionTitle from "@/components/SectionTitle";
import AnimeGrid from "@/components/AnimeGrid";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Clock, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  const { data: mainData, loading: mainLoading } = useAnimeAPI("/main");

  const carouselData = mainData?.carousel || null;
  const latestEpisodes = mainData?.lastetsEp || null;
  const recentSeries = mainData?.recentSeries || null;

  function renderHeroSection() {
    if (mainLoading) {
      return <LoadingSkeleton type="hero" />;
    }

    if (!carouselData || carouselData.length === 0) {
      return null;
    }

    return (
      <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="h-full w-full"
        >
          <CarouselContent>
            {carouselData.map((anime, index) => (
              <CarouselItem
                key={anime.id || index}
                className="relative h-[80vh] min-h-[600px]"
              >
                <div className="absolute inset-0">
                  <img
                    src={anime.image || "/placeholder.svg"}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-16">
                  <div className="max-w-2xl space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {anime.type && (
                        <span className="bg-primary text-black px-3 py-1 rounded-lg text-sm font-semibold">
                          {anime.type}
                        </span>
                      )}
                      {anime.rating && (
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold">
                            {anime.rating}
                          </span>
                        </div>
                      )}
                      {anime.status && (
                        <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                          {anime.status}
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                      {anime.title}
                    </h1>
                    {anime.description && (
                      <p className="text-muted-foreground text-lg line-clamp-3 text-pretty">
                        {anime.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-black font-semibold"
                      >
                        <Link href={`/anime/${anime.id}`}>
                          <Play className="w-5 h-5 mr-2 fill-black" />
                          Ver Ahora
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href={`/anime/${anime.id}`}>Mas Informacion</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-8" />
          <CarouselNext className="right-4 md:right-8" />
        </Carousel>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="relative overflow-hidden">
        {renderHeroSection()}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-6 ">
            <TrendingUp className="w-6 h-6 text-primary" />
            <SectionTitle>Ultimos episodios</SectionTitle>
          </div>
          <AnimeGrid
            animes={latestEpisodes}
            loading={mainLoading}
            columns={4}
            isEp={true}
          />
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <SectionTitle>Series recientes</SectionTitle>
          </div>
          <AnimeGrid
            animes={recentSeries}
            loading={mainLoading}
            columns={6}
            isEp={false}
          />
        </section>
      </div>
    </div>
  );
}
