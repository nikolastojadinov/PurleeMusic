import React, { useState, useEffect } from 'react';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import MusicList from './components/MusicList';
import NowPlaying from './components/NowPlaying';

export interface MusicFile {
  id: string;
  name: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  last_accessed_at: string | null;
}

export interface PlayerState {
  currentTrack: MusicFile | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

function App() {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  const fetchMusicFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/music');
      if (!response.ok) {
        throw new Error('Failed to fetch music files');
      }
      const data = await response.json();
      setMusicFiles(data.files || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (track: MusicFile) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
    }));
  };

  const togglePlayPause = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const updatePlayerTime = (currentTime: number, duration: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime,
      duration,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 PurleeMusic</h1>
        <p>Your music streaming experience</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            Error: {error}
            <button onClick={fetchMusicFiles}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading music files...</div>
        ) : (
          <div className="music-container">
            <div className="music-list-container">
              <MusicList 
                files={musicFiles} 
                onPlay={playTrack}
                currentTrack={playerState.currentTrack}
              />
            </div>
            
            <div className="player-container">
              {playerState.currentTrack && (
                <>
                  <NowPlaying playerState={playerState} />
                  <MusicPlayer
                    track={playerState.currentTrack}
                    isPlaying={playerState.isPlaying}
                    onTogglePlay={togglePlayPause}
                    onTimeUpdate={updatePlayerTime}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
