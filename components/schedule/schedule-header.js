"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "../../lib/date-utils";
// import { formatDate } from "@/lib/date-utils"

export default function ScheduleHeader({ selectedDate }) {
  const router = useRouter();
  const [datePickerValue, setDatePickerValue] = useState(
    formatDate(selectedDate)
  );

  // Get the start and end dates of the current week
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  // Format dates for display
  const startFormatted = startOfWeek.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const endFormatted = endOfWeek.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(startOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    router.push(`/schedule?date=${formatDate(prevWeek)}`);
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const nextWeek = new Date(startOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    router.push(`/schedule?date=${formatDate(nextWeek)}`);
  };

  // Navigate to today
  const goToToday = () => {
    router.push("/schedule");
  };

  // Handle date picker change
  const handleDateChange = (e) => {
    setDatePickerValue(e.target.value);
    router.push(`/schedule?date=${e.target.value}`);
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Weekly Anime Schedule
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-lg text-purple-400 font-medium">
          {startFormatted} - {endFormatted}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>

          <button
            onClick={goToToday}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm"
          >
            Today
          </button>

          <button
            onClick={goToNextWeek}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          <div className="relative ml-2">
            <input
              type="date"
              value={datePickerValue}
              onChange={handleDateChange}
              className="bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-1.5 pl-9 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 p-4 rounded-lg border border-purple-900/20 mb-6">
        <p className="text-gray-300 text-sm">
          This schedule shows the upcoming anime episodes for the week. Times
          are displayed in your local timezone. Click on an anime to view its
          details or watch the latest episode.
        </p>
      </div>
    </div>
  );
}
