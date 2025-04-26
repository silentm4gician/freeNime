"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Info, Clock, Calendar } from "lucide-react";
import { formatTimeAgo } from "../../lib/date-utils";
// import { formatTimeAgo } from "@/lib/date-utils"

export default function DailySchedule({ date, animes, isToday }) {
  const [now, setNow] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Format the day for display
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Sort animes by airing time
  const sortedAnimes = [...animes].sort((a, b) => {
    return new Date(a.airingTimestamp) - new Date(b.airingTimestamp);
  });

  return (
    <div className="bg-gray-900 rounded-lg border border-purple-900/20 overflow-hidden">
      <div
        className={`px-6 py-4 border-b border-purple-900/20 ${
          isToday ? "bg-purple-900/20" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar size={18} />
            {dayName} <span className="text-purple-400 ml-2">{monthDay}</span>
          </h2>

          {isToday && (
            <div className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
              Today
            </div>
          )}
        </div>
      </div>

      {sortedAnimes.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-400">No scheduled anime for this day.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {sortedAnimes.map((anime) => {
            const airingTime = new Date(anime.airingTimestamp);
            const hasAired = now > airingTime;
            const isAiringNow = hasAired && now - airingTime < 30 * 60 * 1000; // Within 30 minutes

            return (
              <div
                key={anime.id}
                className={`p-4 md:p-6 transition-colors ${
                  hasAired ? "bg-gray-900/50" : "bg-gray-900"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <div
                      className={`text-center w-16 ${
                        hasAired ? "text-gray-500" : "text-white"
                      }`}
                    >
                      <div className="text-lg font-bold">{anime.time}</div>
                      <div className="text-xs uppercase">
                        {hasAired ? "Aired" : "Airing"}
                      </div>
                    </div>

                    {/* <div className="relative h-16 w-12 md:h-20 md:w-14 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={`/placeholder.svg?height=80&width=56&text=${encodeURIComponent(
                          anime.name.charAt(0)
                        )}`}
                        alt={anime.name}
                        fill
                        className="object-cover bg-gray-800"
                      />
                    </div> */}
                  </div>

                  <div className="flex-grow">
                    <Link
                      href={`/anime/${anime.id}`}
                      className="hover:text-purple-400 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {anime.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-2">{anime.jname}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock size={14} className="text-purple-400" />
                        <span
                          className={
                            hasAired ? "text-gray-500" : "text-gray-300"
                          }
                        >
                          {hasAired
                            ? `Aired ${formatTimeAgo(airingTime)}`
                            : `Airs ${formatTimeAgo(airingTime)}`}
                        </span>
                      </div>

                      <div className="bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded">
                        Episode {anime.episode}
                      </div>

                      {isAiringNow && (
                        <div className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded animate-pulse">
                          Airing Now
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex gap-2 mt-3 md:mt-0">
                    {hasAired && (
                      <Link
                        href={`/watch/${anime.id}/episode/${anime.episode}`}
                        className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                      >
                        <Play size={16} />
                        Watch
                      </Link>
                    )}

                    <Link
                      href={`/anime/${anime.id}`}
                      className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                      <Info size={16} />
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
