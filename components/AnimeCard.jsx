"use client";

import Link from "next/link";
import { Info, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnimeCard({ anime, isEp }) {
  const imageUrl = anime?.image || "/placeholder.svg?height=400&width=300";
  const title = anime?.title || anime?.name || "Unknown Title";
  // const type = anime?.type || "TV";
  const status = anime?.status;
  const animeId = anime?.id || anime?.mal_id;
  const lastIndex = animeId.lastIndexOf("-");
  const actualAnimeId = isEp ? animeId.slice(0, lastIndex) : animeId;
  const episode = anime?.episodeNumber;

  return (
    <Link
      href={isEp ? `/watch/${actualAnimeId}/${animeId}` : `/anime/${animeId}`}
    >
      <Card
        className={` ${
          isEp
            ? "aspect-video group bg-card hover:ring-2 hover:ring-primary transition-all duration-300 overflow-hidden p-0"
            : "p-0 group overflow-hidden bg-card hover:ring-2 hover:ring-primary transition-all duration-300 h-full"
        }`}
      >
        <div
          className={` relative  ${isEp ? "" : " overflow-hidden aspect-2/3"}`}
        >
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className={` w-full h-full object-cover group-hover:scale-110 transition-transform duration-300`}
          />
          <div
            className={`absolute bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-0 ${
              isEp ? "" : ""
            }`}
          >
            <div
              className={`absolute flex items-center justify-center  ${
                isEp ? "z-10 top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2" : "inset-0"
              }`}
            >
              <div className="bg-primary/90 rounded-full p-4">
                {isEp ? (
                  <Play className="w-8 h-8 text-black fill-black" />
                ) : (
                  <Info className="w-8 h-8 text-black " />
                )}
              </div>
            </div>
          </div>
          {/* {type && (
            <Badge className="absolute top-2 left-2 bg-primary/90 text-black font-semibold">
              {type}
            </Badge>
          )} */}
          {episode && (
            <Badge className="text-sm absolute top-1 right-2 text-black bg-amber-400/80 font-bold">
              {episode}
            </Badge>
          )}
          {status && (
            <Badge className="absolute top-2 left-2 bg-primary/90 text-black font-semibold">
              {status}
            </Badge>
          )}
          {isEp && (
            <Badge className="absolute left-2 top-1 bg-primary/90 text-black text-sm max-w-1/2 line-clamp-1 font-medium">
              {title}
            </Badge>
          )}
        </div>
        <CardContent className={`p-4 ${isEp ? "hidden" : ""}`}>
          <h3
            className={`font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors"}`}
          >
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
