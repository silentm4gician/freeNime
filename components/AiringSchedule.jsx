"use client";

import { useState } from "react";
import AiringCard from "./AiringCard";
import Pagination from "./Pagination";

export default function AiringSchedule({
  airings,
  currentPage,
  hasNextPage,
  setCurrentPage,
}) {
  const [selectedDay, setSelectedDay] = useState("week");

  const days = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "week", label: "This Week" },
  ];

  const filterAirings = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return airings.filter((airing) => {
      const airingDate = new Date(airing.airingAt * 1000);

      switch (selectedDay) {
        case "today":
          return airingDate.toDateString() === now.toDateString();
        case "tomorrow":
          return airingDate.toDateString() === tomorrow.toDateString();
        case "week":
          return airingDate <= weekEnd && airingDate >= now;
        default:
          return true;
      }
    });
  };

  const filteredAirings = filterAirings();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-auto p-1">
        {days.map((day) => (
          <button
            key={day.value}
            onClick={() => {
              // Al cambiar de día, siempre vuelve a la página 1
              setCurrentPage(1);
              setSelectedDay(day.value);
            }}
            className={`py-2 text-sm md:text-lg rounded-full transition-colors ${
              selectedDay === day.value
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAirings.map((airing) => (
          <AiringCard key={`${airing.id}-${airing.episode}`} airing={airing} />
        ))}
      </div>

      {/* Solo muestra paginación si está seleccionado "week" */}
      {selectedDay === "week" && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
