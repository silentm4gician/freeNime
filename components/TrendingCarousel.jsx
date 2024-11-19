"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrendingCarousel({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!data.length) {
      console.error("TrendingCarousel: No data provided");
    }
  }, [data]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  }, [data]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  }, [data]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isHovered]);

  if (!data.length) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No data available for the carousel.</p>
      </div>
    );
  }

  const anime = data[currentSlide];

  return (
    <div
      className="relative h-[80vh] md:h-[50vh] md:w-[80vw] lg:h-[50vh] w-full mx-auto overflow-hidden rounded-xl bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 lg:flex lg:items-center"
        >
          <div className="relative h-full lg:h-auto lg:w-1/2 lg:flex-shrink-0 overflow-hidden">
            <motion.img
              src={anime.image}
              alt={anime.title || "Anime Image"}
              className="w-full h-full object-cover lg:max-h-[70vh] lg:w-[60%] lg:mx-auto md:border-4 md:border-purple-400 md:shadow-xl md:shadow-purple-400 rounded-lg"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:hidden" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute lg:relative bottom-0 left-0 right-0 p-8 lg:w-1/2"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {anime.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres?.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-purple-400/20 rounded-full text-sm text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <Link href={`/anime/${anime.id}`}>
                <motion.button
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Watch Now</span>
                  <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-pink-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
        <CarouselButton onClick={prevSlide} direction="left" />
        <CarouselButton onClick={nextSlide} direction="right" />
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {data.map((_, index) => (
          <CarouselDot
            key={index}
            isActive={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselButton({ onClick, direction }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      onClick={onClick}
      className="group relative rounded-full bg-black/50 p-3 backdrop-blur-sm transition-transform hover:scale-110"
      whileHover={{ x: direction === "left" ? -2 : 2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      <Icon
        className={`h-6 w-6 transition-transform group-hover:${
          direction === "left" ? "-" : ""
        }translate-x-0.5`}
      />
    </motion.button>
  );
}

function CarouselDot({ isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative h-2.5 w-2.5 overflow-hidden rounded-full transition-colors ${
        isActive ? "bg-purple-500" : "bg-gray-500/50"
      }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Go to slide ${index + 1}`}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        />
      )}
    </motion.button>
  );
}
