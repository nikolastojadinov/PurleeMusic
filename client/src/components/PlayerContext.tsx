import React, { createContext, useContext, useState, useRef } from "react";

export type Song = {
  title: string;
  artist: string;
  audio_url: string;
  cover_url: string;
};

export type PlayerContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  setIsPlaying: (v: boolean) => void;
  setCurrentSong: (song: Song | null) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const resume = () => setIsPlaying(true);

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, pause, resume, setIsPlaying, setCurrentSong, audioRef }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
