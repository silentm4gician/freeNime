"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function VideoPlayer({ src, hasDirectVideoUrl }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // Add fullscreen change listener
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(function setupVideoListeners() {
    const video = videoRef.current;
    if (!video) return;

    function handleTimeUpdate() {
      setCurrentTime(video.currentTime);
    }

    function handleDurationChange() {
      setDuration(video.duration);
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);

    return function cleanup() {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleSeek(value) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  }

  function handleVolumeChange(value) {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  // Modify the toggleFullscreen function
  function toggleFullscreen() {
    const container = hasDirectVideoUrl
      ? videoRef.current?.parentElement
      : containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen().catch((err) => {
        console.log("Fullscreen request failed:", err);
      });
    }
  }

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function handleMouseMove() {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(function hideControls() {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }

  function handleMouseLeave() {
    if (isPlaying) {
      setShowControls(false);
    }
  }

  const controlsOpacity = showControls ? "opacity-100" : "opacity-0";
  const volumeValue = isMuted ? 0 : volume;

  return (
    <>
      {hasDirectVideoUrl ? (
        <div
          className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full"
            onClick={togglePlay}
          />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Button
                size="lg"
                onClick={togglePlay}
                className="bg-primary hover:bg-primary/90 text-black rounded-full w-20 h-20 cursor-pointer"
              >
                <Play className="size-8 fill-black" />
              </Button>
            </div>
          )}

          <div
            className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${controlsOpacity}`}
          >
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="mb-4"
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={togglePlay}
                  className="text-white hover:text-black cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-white hover:text-black cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <div className="w-20 hidden sm:block">
                    <Slider
                      value={[volumeValue]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="h-4"
                      trackClassName={
                        volumeValue > 0 ? "bg-primary/20" : "bg-muted/50"
                      }
                      rangeClassName={
                        volumeValue > 0.5
                          ? "bg-primary"
                          : volumeValue > 0
                          ? "bg-primary/50"
                          : "bg-muted-foreground"
                      }
                    />
                  </div>
                </div>
                <span className="text-sm text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-black cursor-pointer"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
        >
          <iframe
            src={src}
            className="w-full h-full"
            allow="autoplay"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Add fullscreen button overlay for iframe */}
          <div className="absolute bottom-4 right-4 z-10">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white cursor-pointer"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
