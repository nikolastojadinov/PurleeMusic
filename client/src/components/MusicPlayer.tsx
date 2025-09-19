import React, { useEffect, useState } from 'react';
import './MusicPlayer.css';
import { usePlayer } from './PlayerContext';

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, pause, resume, audioRef } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    if (currentSong && isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentSong, isPlaying, audioRef]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={pause}
        preload="metadata"
      />

      <div className="player-controls">
        <button
          className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`}
          onClick={isPlaying ? pause : resume}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      <div className="player-progress">
        <span className="time-current">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span className="time-total">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;