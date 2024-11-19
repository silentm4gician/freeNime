"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  hasNextPage,
  onPageChange,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-center gap-2 mt-8 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex items-center gap-1 p-1 rounded-lg transition-colors ${
          currentPage <= 1
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-white"
        }`}
      >
        <ChevronLeft className="w-8 h-8 text-purple-400" />
      </button>

      <span className="px-4 py-2 bg-gray-800 rounded-lg text-white">
        {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`flex items-center gap-1 p-1 rounded-lg transition-colors ${
          !hasNextPage
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-white"
        }`}
      >
        <ChevronRight className="w-8 h-8 text-purple-400" />
      </button>
    </div>
  );
}
