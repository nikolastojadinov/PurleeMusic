import React from "react";
import { usePlayer } from "./PlayerContext";
import "./MusicList.css";


const songs = [
  {
    title: "Retro Lounge",
    artist: "PurpleMusic Artist",
    audio_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Music/retro-lounge-389644.mp3",
    cover_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/F6897AAD-9902-4F0C-95EA-FD213A783D92.png",
  },
  {
    title: "Deep Abstract Ambient",
    artist: "PurpleMusic Artist",
    audio_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Music/deep-abstract-ambient_snowcap-401656.mp3",
    cover_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/621B279E-CA15-482E-849A-60D0774A9DD5.png",
  },
  {
    title: "Running Night",
    artist: "PurpleMusic Artist",
    audio_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Music/running-night-393139%202.mp3",
    cover_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/76DD6929-0A2A-4D7C-8E09-86124174600A.png",
  },
  {
    title: "Vlog Beat Background",
    artist: "PurpleMusic Artist",
    audio_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Music/vlog-beat-background-349853.mp3",
    cover_url:
      "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/IMG_0596.png",
  },
];


const recentlyPlayed = [
  songs[2], songs[1], songs[0]
];
const madeForYou = [
  songs[3], songs[0]
];

// ...existing code...

const MusicList: React.FC = () => {
  const { playSong, currentSong, isPlaying, resume } = usePlayer();

  // Helper za play/pause logiku
  const handlePlayClick = (song: any) => {
    if (!currentSong || currentSong.audio_url !== song.audio_url) {
      playSong(song); // uvek pokreni iz početka
    } else if (!isPlaying) {
      resume(); // nastavi ako je pauzirano
    } // ako je već aktivna i svira, ne radi ništa
  };

  const renderPlayButton = (song: any) => {
    const isActive = currentSong && currentSong.audio_url === song.audio_url;
    return (
      <button className={"music-h-play" + (isActive ? (isPlaying ? " playing" : " paused") : "")} onClick={() => handlePlayClick(song)}>
        {isActive ? (
          isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><rect x="9" y="8" width="2.8" height="8" rx="1.2" fill="#a259ff"/><rect x="14.2" y="8" width="2.8" height="8" rx="1.2" fill="#a259ff"/></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><polygon points="10,8 17,12 10,16" fill="#a259ff"/></svg>
          )
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><polygon points="10,8 17,12 10,16" fill="#a259ff"/></svg>
        )}
      </button>
    );
  };

  return (
    <div className="home-hero-wrap">
      <section className="music-section">
        <h2 className="music-section-title">Recently Played</h2>
        <div className="music-horizontal-list">
          {recentlyPlayed.map((song, idx) => (
            <div className="music-h-card" key={idx}>
              <div className="music-h-cover-wrap">
                <img className="music-h-cover" src={song.cover_url} alt={song.title} />
                {renderPlayButton(song)}
              </div>
              <div className="music-h-info">
                <div className="music-h-title">{song.title}</div>
                <div className="music-h-artist">{song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="music-section">
        <h2 className="music-section-title">Made For You</h2>
        <div className="music-horizontal-list">
          {madeForYou.map((song, idx) => (
            <div className="music-h-card" key={idx}>
              <div className="music-h-cover-wrap">
                <img className="music-h-cover" src={song.cover_url} alt={song.title} />
                {renderPlayButton(song)}
              </div>
              <div className="music-h-info">
                <div className="music-h-title">{song.title}</div>
                <div className="music-h-artist">{song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MusicList;