"use client";

import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Loader2,
} from "lucide-react";
import { normalizeUrl } from "@/utils/urlHandler";

export default function VideoPlayer({ episodeData }) {
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (!episodeData?.sources?.length) return;

    setIsLoading(true);
    const video = videoRef.current;
    if (!video) return;

    let hls = null;

    if (Hls.isSupported()) {
      const source =
        episodeData.sources.find((s) => s.quality === currentQuality) ||
        episodeData.sources.find((s) => s.quality === "default") ||
        episodeData.sources[0];

      // Extraer los componentes de la URL original
      const sourceUrl = new URL(source.url);
      const baseUrl = sourceUrl.origin;
      const streamPath = sourceUrl.pathname.substring(
        0,
        sourceUrl.pathname.lastIndexOf("/") + 1
      );

      hls = new Hls({
        xhrSetup: function (xhr, url) {
          let fullUrl;

          try {
            // Intentar parsear la URL entrante
            const parsedUrl = new URL(url);

            // Si la URL es de localhost o contiene /api/, es una URL relativa mal construida
            if (parsedUrl.hostname === "localhost" || url.includes("/api/")) {
              // Extraer solo el nombre del archivo
              const pathParts = parsedUrl.pathname.split("/");
              const fileName = pathParts[pathParts.length - 1];
              fullUrl = `${baseUrl}${streamPath}${fileName}`;
            } else {
              fullUrl = url;
            }
          } catch (e) {
            // Si no se puede parsear como URL, es una ruta relativa
            const fileName = url.startsWith("/") ? url.substring(1) : url;
            fullUrl = `${baseUrl}${streamPath}${fileName}`;
          }

          const proxyUrl = `/api/proxy?url=${normalizeUrl(fullUrl)}`;

          xhr.open("GET", proxyUrl, true);
        },
        // Asegurar que la URL base se mantenga consistente
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetry: 3,
        manifestLoadingMaxRetryTimeout: 64000,
        levelLoadingRetryDelay: 1000,
        levelLoadingMaxRetry: 3,
        levelLoadingMaxRetryTimeout: 64000,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetry: 3,
        fragLoadingMaxRetryTimeout: 64000,
      });

      const initialProxyUrl = `/api/proxy?url=${normalizeUrl(source.url)}`;

      hls.loadSource(initialProxyUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        // video.play().catch(() => setIsPlaying(false));
        video
          .play()
          .then(() => {
            setIsPlaying(true); // Al reproducir, actualizamos el estado a `true`
          })
          .catch(() => {
            setIsPlaying(false); // Si no puede reproducir, se asegura que el estado sea `false`
          });
      });

      // Detectar si el video empieza a reproducirse para mantener el estado sincronizado
      video.addEventListener("play", () => {
        setIsPlaying(true);
      });
      // Detectar si el video se pausa
      video.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", {
          type: data.type,
          details: data.details,
          fatal: data.fatal,
          url: data.url,
          response: data.response,
        });
        setIsLoading(false);
        setIsPlaying(false);
      });

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [episodeData, currentQuality]);

  return (
    <div
      className="relative aspect-video bg-black rounded-lg overflow-hidden group m-auto shadow-2xl shadow-purple-800/20"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-2" />
            <p className="text-white">Loading video...</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-transparent hover:bg-purple-400/50 duration-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a78bfa ${
                  (currentTime / duration) * 100
                }%, #0006 ${(currentTime / duration) * 100}%)`,
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-purple-400 duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-purple-400 duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-transparent rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #a78bfa ${
                        (isMuted ? 0 : volume) * 100
                      }%, #0006 ${(isMuted ? 0 : volume) * 100}%)`, // gradiente con dos colores
                    }}
                  />
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="text-white hover:text-purple-400 duration-200"
                  >
                    <Settings className="w-6 h-6" />
                  </button>

                  {showQualityMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2">
                      {episodeData.sources
                        .filter(
                          (source) =>
                            source.quality !== "backup" &&
                            source.quality !== "default"
                        )
                        .map((source) => (
                          <button
                            key={source.quality}
                            onClick={() => {
                              setCurrentQuality(source.quality);
                              setShowQualityMenu(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm rounded hover:bg-purple-500/20 ${
                              currentQuality === source.quality
                                ? "text-purple-400"
                                : "text-white"
                            }`}
                          >
                            {source.quality}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-purple-400 duration-200"
                >
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
