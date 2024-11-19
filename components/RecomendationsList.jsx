import React from "react";
import Link from "next/link";

export function RecommendationsList({ recs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {recs?.map((rec) => (
        <Link
          key={rec.id}
          href={`/anime/${rec.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
        >
          <div className="aspect-[3/4] relative">
            <img
              src={rec.image}
              alt={rec.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
              {rec.title}
            </h3>
            <p className="text-sm text-gray-400">
              {rec.releaseDate.split(":")[1]?.trim()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
