import React from 'react';
// import { PlayerState } from '../App';
const NowPlaying: React.FC<{ playerState: any }> = ({ playerState }) => {
  const { currentTrack, currentTime, duration } = playerState;
  if (!currentTrack) return null;

  const getDisplayName = (filename: string) => {
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="now-playing">
      <div className="album-artwork">
        <img src="/logo512.png" alt="Album Art" />
      </div>
      <div className="track-details">
        <div className="track-title">{getDisplayName(currentTrack.name)}</div>
        <div className="track-artist">Unknown Artist</div>
      </div>
      <div className="progress-info">
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="progress-visual">
          <div 
            className="progress-fill"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;