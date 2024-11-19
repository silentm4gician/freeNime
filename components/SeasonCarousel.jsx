import { useState, useEffect, useRef } from "react";
import { ChevronLeftCircle, ChevronRightCircle, Star } from "lucide-react";

export default function SeasonCarousel({ animeData, season, setSeason }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleWheel = (e) => {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      };
      carousel.addEventListener("wheel", handleWheel, { passive: false });
      return () => carousel.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (e, seasonNumber) => {
    // Only trigger click if we're not dragging
    if (!isDragging) {
      setSeason(seasonNumber);
    }
  };

  if (!animeData?.seasons || animeData.seasons.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <p className="text-lg font-semibold py-1">Select Season</p>
      <div className="relative">
        <div
          ref={carouselRef}
          className={`season-carousel flex gap-4 overflow-x-auto py-4 px-2 cursor-grab active:cursor-grabbing select-none`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(107, 114, 128, 0.5) rgba(31, 41, 55, 0.5)",
            userSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {animeData.seasons
            .filter((seasonData) => seasonData.season_number !== 0)
            .map((seasonData) => (
              <div
                key={seasonData.id}
                className={`flex-shrink-0 w-32 bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 ${
                  season === seasonData.season_number
                    ? "ring-2 ring-purple-500"
                    : ""
                }`}
                onClick={(e) => handleClick(e, seasonData.season_number)}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/original${seasonData.poster_path}`}
                    alt={seasonData.name}
                    className="w-full h-48 object-cover group-hover:shadow-lg transition-transform duration-300"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-semibold px-2 text-center">
                      {seasonData.name}
                    </p>
                  </div>
                  {seasonData.vote_average != 0 && (
                    <div className="flex justify-center items-center absolute top-1 right-1 bg-black/70 rounded-lg px-1 gap-1 font-semibold">
                      <Star size={16} className="text-yellow-400" />
                      {seasonData.vote_average}
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{seasonData.name}</h3>
                  <p className="text-xs text-gray-400">
                    {seasonData.episode_count} Episodes
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <p className="text-lg font-semibold pt-4">List of Episodes</p>
    </div>
  );
}
