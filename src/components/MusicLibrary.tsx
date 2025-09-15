import React from 'react';
import { useMusic } from '../hooks/useMusic';
import MusicPlayer from './MusicPlayer';
import './MusicLibrary.css';

const MusicLibrary: React.FC = () => {
  const { musicFiles, isLoading, error, refetch } = useMusic();

  if (isLoading) {
    return (
      <div className="music-library">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading your music library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="music-library">
        <div className="error-container">
          <div className="error-icon">🚫</div>
          <h3>Unable to load music library</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={refetch}>
            Try Again
          </button>
          <div className="config-hint">
            <small>
              💡 Make sure your Supabase configuration is correct in your .env file
            </small>
          </div>
        </div>
      </div>
    );
  }

  if (musicFiles.length === 0) {
    return (
      <div className="music-library">
        <div className="empty-container">
          <div className="empty-icon">🎵</div>
          <h3>No music found</h3>
          <p>Your music library is empty. Upload some audio files to your Supabase 'music' bucket to get started!</p>
          <button className="retry-btn" onClick={refetch}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="music-library">
      <div className="library-header">
        <h2>🎵 Your Music Library</h2>
        <p>{musicFiles.length} {musicFiles.length === 1 ? 'track' : 'tracks'} available</p>
      </div>
      
      <div className="music-grid">
        {musicFiles.map((file, index) => (
          <MusicPlayer key={`${file.name}-${index}`} file={file} />
        ))}
      </div>
    </div>
  );
};

export default MusicLibrary;