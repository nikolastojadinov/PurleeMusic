import React, { useRef, useEffect } from 'react';
import { MusicFile } from '../App';
import './MusicPlayer.css';

interface MusicPlayerProps {
  track: MusicFile;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onTimeUpdate,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset audio when track changes
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [track.id, isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      onTimeUpdate(audio.currentTime, audio.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      onTimeUpdate(newTime, audio.duration || 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStreamUrl = (filename: string) => {
    return `/api/stream/${encodeURIComponent(filename)}`;
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={getStreamUrl(track.name)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => onTogglePlay()}
        preload="metadata"
      />
      
      <div className="player-controls">
        <button
          className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`}
          onClick={onTogglePlay}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      <div className="player-progress">
        <span className="time-current">
          {formatTime(audioRef.current?.currentTime || 0)}
        </span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={audioRef.current?.duration || 0}
          value={audioRef.current?.currentTime || 0}
          onChange={handleSeek}
        />
        <span className="time-total">
          {formatTime(audioRef.current?.duration || 0)}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;