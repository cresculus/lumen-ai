"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

export type PlayerTrack = {
  id: string;
  title: string;
  slug: string;
  tags?: string[];
  access?: "full" | "preview";
};

type PlayerContextValue = {
  currentTrack: PlayerTrack | null;
  isPlaying: boolean;
  playTrack: (track: PlayerTrack) => Promise<void>;
  togglePlay: () => void;
  queue: PlayerTrack[];
  addToQueue: (track: PlayerTrack) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);
const PREVIEW_LIMIT_SEC = 60;

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<PlayerTrack[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [access, setAccess] = useState<"full" | "preview">("preview");
  const [loading, setLoading] = useState(false);

  const playTrack = useCallback(async (track: PlayerTrack) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stream/${track.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Cannot play track");

      setCurrentTrack({ ...track, access: data.access });
      setStreamUrl(data.url);
      setAccess(data.access);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Playback failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    setIsPlaying((p) => !p);
  }, [currentTrack]);

  const addToQueue = useCallback((track: PlayerTrack) => {
    setQueue((q) => (q.some((t) => t.id === track.id) ? q : [...q, track]));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    audio.src = streamUrl;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [streamUrl, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (access === "preview" && audio.currentTime >= PREVIEW_LIMIT_SEC) {
        audio.pause();
        setIsPlaying(false);
        audio.currentTime = 0;
      }
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setQueue((q) => {
        if (q.length > 0) {
          const [next, ...rest] = q;
          playTrack(next);
          return rest;
        }
        return q;
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [access, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying]);

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const playNext = () => {
    setQueue((q) => {
      if (q.length === 0) return q;
      const [next, ...rest] = q;
      playTrack(next);
      return rest;
    });
  };

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      playTrack,
      togglePlay,
      queue,
      addToQueue,
    }),
    [currentTrack, isPlaying, playTrack, togglePlay, queue, addToQueue],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0F1C2E]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {access === "preview" && (
              <p className="text-center text-xs text-lumen-gold-light/90">
                60-second preview ·{" "}
                <a href="/pricing" className="underline hover:text-lumen-cream">
                  Subscribe for full lossless playback
                </a>
              </p>
            )}
            <div className="flex items-center gap-4">
              <div className="hidden h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-lumen-gold/40 to-indigo-500/20 sm:block" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {currentTrack.title}
                </p>
                <p className="truncate text-xs text-slate-400">
                  {currentTrack.tags?.join(" · ") || "Lumen AI Music"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={playNext}
                  className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  aria-label="Previous"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={togglePlay}
                  className="rounded-full bg-lumen-gold p-3 text-lumen-midnight hover:bg-lumen-gold-light disabled:opacity-50"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 translate-x-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={playNext}
                  className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  aria-label="Next"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
              <div className="hidden flex-1 items-center gap-2 md:flex">
                <span className="text-xs tabular-nums text-slate-400">
                  {formatDuration(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="h-1 flex-1 cursor-pointer accent-lumen-gold"
                />
                <span className="text-xs tabular-nums text-slate-400">
                  {formatDuration(duration)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="rounded-full p-2 text-slate-300 hover:text-white"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </PlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}

export function PlayTrackButton({
  track,
  className,
  size = "md",
}: {
  track: PlayerTrack;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useMusicPlayer();
  const isCurrent = currentTrack?.id === track.id;

  const sizeClass =
    size === "lg" ? "p-4" : size === "sm" ? "p-2" : "p-3";
  const iconClass = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      type="button"
      onClick={() => (isCurrent ? togglePlay() : playTrack(track))}
      className={cn(
        "rounded-full bg-lumen-gold text-lumen-midnight shadow-lg shadow-lumen-gold/25 transition hover:bg-lumen-gold-light hover:scale-105",
        sizeClass,
        className,
      )}
      aria-label={`Play ${track.title}`}
    >
      {isCurrent && isPlaying ? (
        <Pause className={iconClass} />
      ) : (
        <Play className={cn(iconClass, "translate-x-0.5")} />
      )}
    </button>
  );
}
