"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  Settings,
  Subtitles,
} from "lucide-react";

export default function VideoPlayer({
  sources,
  tracks,
  intro,
  outro,
  poster,
  episodeTitle,
  episodeNumber,
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [showSkipOutro, setShowSkipOutro] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState("off");

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !sources || sources.length === 0) return;

    let hls;

    const proxyUrl = (url) => {
      if (url.includes("/api/proxy?url=")) {
        return url;
      }
      return `/api/proxy?url=${encodeURIComponent(url)}`;
    };

    const subtitleUrl = (url) => {
      if (url.includes("/api/subtitle?url=")) {
        return url;
      }
      return `/api/subtitle?url=${encodeURIComponent(url)}`;
    };

    // Initialize HLS
    if (Hls.isSupported()) {
      hls = new Hls({
        xhrSetup: (xhr, url) => {
          let finalUrl = url;

          if (!url.startsWith("/api/proxy?url=")) {
            if (url.startsWith("http")) {
              finalUrl = proxyUrl(url);
            } else {
              const baseUrl = new URL(sources[0].url).origin;
              const absoluteUrl = new URL(url, baseUrl).toString();
              finalUrl = proxyUrl(absoluteUrl);
            }
          }

          xhr.open("GET", finalUrl, true);
        },
      });

      hls.attachMedia(video);
      hls.loadSource(proxyUrl(sources[0].url));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = proxyUrl(sources[0].url);
    }

    // Clean previous tracks
    while (video.firstChild) {
      video.removeChild(video.firstChild);
    }

    // Add "Off" option
    const offTrack = document.createElement("track");
    offTrack.kind = "subtitles";
    offTrack.label = "Off";
    offTrack.srclang = "off";
    offTrack.default = true;
    video.appendChild(offTrack);

    // Add subtitle tracks
    if (tracks && tracks.length > 0) {
      tracks.forEach((track) => {
        if (track.kind === "captions" || track.kind === "subtitles") {
          const trackElement = document.createElement("track");
          trackElement.kind = track.kind;
          trackElement.label = track.label;
          trackElement.srclang = track.label.toLowerCase();

          // 💥 Aquí proxyamos el src también
          trackElement.src = subtitleUrl(track.file);

          if (track.default) {
            trackElement.default = true;
            setSelectedSubtitle(track.label.toLowerCase());
          }

          video.appendChild(trackElement);
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [sources, tracks]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Show skip intro button
      if (
        intro &&
        video.currentTime >= intro.start &&
        video.currentTime < intro.end
      ) {
        setShowSkipIntro(true);
      } else {
        setShowSkipIntro(false);
      }

      // Show skip outro button
      if (
        outro &&
        video.currentTime >= outro.start &&
        video.currentTime < outro.end
      ) {
        setShowSkipOutro(true);
      } else {
        setShowSkipOutro(false);
      }

      // Update progress bar
      if (progressRef.current) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressRef.current.style.width = `${percentage}%`;
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, [intro, outro]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const player = playerRef.current;

    if (player) {
      player.addEventListener("mousemove", handleMouseMove);
      player.addEventListener("mouseenter", handleMouseMove);
      player.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
    }

    return () => {
      if (player) {
        player.removeEventListener("mousemove", handleMouseMove);
        player.removeEventListener("mouseenter", handleMouseMove);
        player.removeEventListener("mouseleave", () => {
          if (isPlaying) {
            setShowControls(false);
          }
        });
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  // Seek
  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;

    if (video && !isNaN(video.duration)) {
      video.currentTime = pos * video.duration;
    }
  };

  // Volume
  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const value = Number.parseFloat(e.target.value);

    if (video) {
      video.volume = value;
      video.muted = value === 0;
    }
  };

  // Mute
  const toggleMute = () => {
    const video = videoRef.current;

    if (video) {
      video.muted = !video.muted;
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const player = playerRef.current;

    if (!player) return;

    if (!isFullscreen) {
      if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Skip intro
  const handleSkipIntro = () => {
    const video = videoRef.current;

    if (video && intro) {
      video.currentTime = intro.end;
    }
  };

  // Skip outro
  const handleSkipOutro = () => {
    const video = videoRef.current;

    if (video && outro) {
      video.currentTime = outro.end;
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle subtitle selection
  const handleSubtitleChange = (lang) => {
    const video = videoRef.current;

    if (!video) return;

    for (let i = 0; i < video.textTracks.length; i++) {
      const track = video.textTracks[i];

      if (lang === "off") {
        track.mode = "disabled";
      } else if (track.label.toLowerCase() === lang) {
        track.mode = "showing";
      } else {
        track.mode = "disabled";
      }
    }

    setSelectedSubtitle(lang);
    setShowSubtitlesMenu(false);
  };

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        preload="auto"
        playsInline
      />

      {/* Skip Intro Button */}
      {showSkipIntro && (
        <button
          className="absolute bottom-24 right-4 bg-purple-600 text-white py-2 px-4 rounded-md shadow-lg z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleSkipIntro();
          }}
        >
          Skip Intro
        </button>
      )}

      {/* Skip Outro Button */}
      {showSkipOutro && (
        <button
          className="absolute bottom-24 right-4 bg-purple-600 text-white py-2 px-4 rounded-md shadow-lg z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleSkipOutro();
          }}
        >
          Skip Outro
        </button>
      )}

      {/* Video Title Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
        <h2 className="text-white text-lg font-medium">
          Episode {episodeNumber}: {episodeTitle}
        </h2>
      </div>

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 z-10 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            ref={progressRef}
            className="h-full bg-purple-600 rounded-full relative"
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button
              className="text-white hover:text-purple-400 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button
                className="text-white hover:text-purple-400 transition-colors"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>
              <input
                ref={volumeRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-purple-600"
              />
            </div>

            {/* Time Display */}
            <div className="text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Subtitles Menu */}
            <div className="relative">
              <button
                className="text-white hover:text-purple-400 transition-colors"
                onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
              >
                <Subtitles size={20} />
              </button>

              {showSubtitlesMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-md shadow-lg p-2 w-40">
                  <div className="text-white text-sm font-medium mb-1 px-2">
                    Subtitles
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    <button
                      className={`w-full text-left px-2 py-1 text-sm rounded ${
                        selectedSubtitle === "off"
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => handleSubtitleChange("off")}
                    >
                      Off
                    </button>
                    {tracks
                      .filter(
                        (track) =>
                          track.kind === "captions" ||
                          track.kind === "subtitles"
                      )
                      .map((track, index) => (
                        <button
                          key={index}
                          className={`w-full text-left px-2 py-1 text-sm rounded ${
                            selectedSubtitle === track.label.toLowerCase()
                              ? "bg-purple-600 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            handleSubtitleChange(track.label.toLowerCase())
                          }
                        >
                          {track.label}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Skip 10s Button */}
            {/* <button
              className="text-white hover:text-purple-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  video.currentTime += 10;
                }
              }}
            >
              <SkipForward size={20} />
            </button> */}

            {/* Settings Button */}
            {/* <button className="text-white hover:text-purple-400 transition-colors">
              <Settings size={20} />
            </button> */}

            {/* Fullscreen Button */}
            <button
              className="text-white hover:text-purple-400 transition-colors"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
