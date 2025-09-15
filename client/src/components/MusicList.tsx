import React from 'react';
import { MusicFile } from '../App';
import './MusicList.css';

interface MusicListProps {
  files: MusicFile[];
  onPlay: (track: MusicFile) => void;
  currentTrack: MusicFile | null;
}

const MusicList: React.FC<MusicListProps> = ({ files, onPlay, currentTrack }) => {
  const getDisplayName = (filename: string) => {
    // Remove file extension and replace underscores/hyphens with spaces
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (files.length === 0) {
    return (
      <div className="music-list-empty">
        <p>No music files found</p>
        <p>Upload some audio files to your Supabase 'music' bucket to get started!</p>
      </div>
    );
  }

  return (
    <div className="music-list">
      <h2>Music Library ({files.length} tracks)</h2>
      <div className="track-list">
        {files.map((file) => (
          <div
            key={file.id}
            className={`track-item ${currentTrack?.id === file.id ? 'active' : ''}`}
            onClick={() => onPlay(file)}
          >
            <div className="track-icon">
              {currentTrack?.id === file.id ? '▶️' : '🎵'}
            </div>
            <div className="track-info">
              <div className="track-name">{getDisplayName(file.name)}</div>
              <div className="track-filename">{file.name}</div>
            </div>
            <div className="track-actions">
              <button
                className="play-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(file);
                }}
              >
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicList;