"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronDown, ChevronUp, Calendar } from "lucide-react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    type: searchParams.get("type")?.split(",") || [],
    status: searchParams.get("status")?.split(",") || [],
    rated: searchParams.get("rated")?.split(",") || [],
    season: searchParams.get("season")?.split(",") || [],
    language: searchParams.get("language")?.split(",") || [],
    genres: searchParams.get("genres")?.split(",") || [],
    score: searchParams.get("score") || "",
    start_date: searchParams.get("start_date") || "",
    end_date: searchParams.get("end_date") || "",
    sort: searchParams.get("sort") || "",
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      type: searchParams.get("type")?.split(",") || [],
      status: searchParams.get("status")?.split(",") || [],
      rated: searchParams.get("rated")?.split(",") || [],
      season: searchParams.get("season")?.split(",") || [],
      language: searchParams.get("language")?.split(",") || [],
      genres: searchParams.get("genres")?.split(",") || [],
      score: searchParams.get("score") || "",
      start_date: searchParams.get("start_date") || "",
      end_date: searchParams.get("end_date") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[category])) {
        if (newFilters[category].includes(value)) {
          newFilters[category] = newFilters[category].filter(
            (item) => item !== value
          );
        } else {
          newFilters[category] = [...newFilters[category], value];
        }
      } else {
        // For single value filters
        newFilters[category] = value;
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      status: [],
      rated: [],
      season: [],
      language: [],
      genres: [],
      score: "",
      start_date: "",
      end_date: "",
      sort: "",
    });
  };

  const applyFilters = () => {
    // Get the current query
    const query = searchParams.get("q") || "";
    const page = searchParams.get("page") || "1";

    // Build the new URL with filters
    let url = `/search?q=${encodeURIComponent(query)}&page=${page}`;

    // Add array filters if they have values
    const arrayFilters = [
      "type",
      "status",
      "rated",
      "season",
      "language",
      "genres",
    ];
    arrayFilters.forEach((filter) => {
      if (filters[filter] && filters[filter].length > 0) {
        url += `&${filter}=${encodeURIComponent(filters[filter].join(","))}`;
      }
    });

    // Add single value filters if they have values
    const singleFilters = ["score", "start_date", "end_date", "sort"];
    singleFilters.forEach((filter) => {
      if (filters[filter]) {
        url += `&${filter}=${encodeURIComponent(filters[filter])}`;
      }
    });

    // Navigate to the new URL
    router.push(url);
  };

  // Filter options
  const typeOptions = ["TV", "Movie", "OVA", "ONA", "Special"];
  const statusOptions = [
    "airing",
    "complete",
    "upcoming",
    "hiatus",
    "cancelled",
  ];
  const ratedOptions = ["g", "pg", "pg-13", "r", "r+", "rx"];
  const seasonOptions = ["winter", "spring", "summer", "fall"];
  const languageOptions = ["sub", "dub", "sub-&-dub"];
  const scoreOptions = [
    "excellent",
    "very-good",
    "good",
    "fine",
    "mediocre",
    "bad",
  ];
  const sortOptions = [
    { value: "recently-updated", label: "Recently Updated" },
    { value: "recently-added", label: "Recently Added" },
    { value: "title-a-z", label: "Title A-Z" },
    { value: "title-z-a", label: "Title Z-A" },
    { value: "score", label: "Score" },
    { value: "released-date", label: "Release Date" },
  ];
  const genreOptions = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Ecchi",
    "Mecha",
    "Music",
    "Psychological",
    "Isekai",
    "Shounen",
    "Shoujo",
    "Seinen",
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Filter size={18} />
          Filters
        </h3>
        <button
          className="text-purple-400 hover:text-purple-300 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <div className="flex items-center">
              <span className="mr-1">Less</span>
              <ChevronUp size={16} />
            </div>
          ) : (
            <div className="flex items-center">
              <span className="mr-1">More</span>
              <ChevronDown size={16} />
            </div>
          )}
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Sort By</h4>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="w-full bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Type</h4>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <button
              key={type}
              className={`text-xs px-3 py-1 rounded-full ${
                filters.type.includes(type.toLowerCase())
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => toggleFilter("type", type.toLowerCase())}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Status</h4>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              className={`text-xs px-3 py-1 rounded-full ${
                filters.status.includes(status)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => toggleFilter("status", status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Language</h4>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              className={`text-xs px-3 py-1 rounded-full ${
                filters.language.includes(lang)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => toggleFilter("language", lang)}
            >
              {lang === "sub-&-dub"
                ? "Sub & Dub"
                : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Score Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Score</h4>
        <select
          value={filters.score}
          onChange={(e) => setFilters({ ...filters, score: e.target.value })}
          className="w-full bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Any Score</option>
          {scoreOptions.map((score) => (
            <option key={score} value={score}>
              {score.charAt(0).toUpperCase() + score.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <>
          {/* Season Filter */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Season</h4>
            <div className="flex flex-wrap gap-2">
              {seasonOptions.map((season) => (
                <button
                  key={season}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.season.includes(season)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => toggleFilter("season", season)}
                >
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Rating</h4>
            <div className="flex flex-wrap gap-2">
              {ratedOptions.map((rating) => (
                <button
                  key={rating}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.rated.includes(rating)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => toggleFilter("rated", rating)}
                >
                  {rating.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2 flex items-center gap-1">
              <Calendar size={14} />
              Date Range
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.start_date}
                  onChange={(e) =>
                    setFilters({ ...filters, start_date: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.end_date}
                  onChange={(e) =>
                    setFilters({ ...filters, end_date: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white text-sm rounded-md border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
              {genreOptions.map((genre) => (
                <button
                  key={genre}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.genres.includes(genre.toLowerCase())
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => toggleFilter("genres", genre.toLowerCase())}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Apply and Clear Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-md transition-colors flex-1"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-md transition-colors"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
