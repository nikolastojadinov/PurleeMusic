import React from 'react';
import './MusicPlayer.css';

interface MusicFile {
  name: string;
  url: string;
  size: number;
  lastModified: string;
}

interface MusicPlayerProps {
  file: MusicFile;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ file }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatFileName = (fileName: string) => {
    // Remove file extension and format for display
    return fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
  };

  return (
    <div className="music-player">
      <div className="music-info">
        <h3 className="music-title">{formatFileName(file.name)}</h3>
        <div className="music-details">
          <span className="file-size">{formatFileSize(file.size)}</span>
          <span className="file-type">{file.name.split('.').pop()?.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="audio-container">
        <audio controls className="audio-player">
          <source src={file.url} type={`audio/${file.name.split('.').pop()}`} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MusicPlayer;