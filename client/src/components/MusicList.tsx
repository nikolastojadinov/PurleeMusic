import React from "react";
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

const MusicList: React.FC = () => {
  return (
    <div className="home-hero-wrap">
      <section className="hero-section">
        <h1 className="hero-title">PurpleMusic</h1>
        <p className="hero-slogan">Stream your favorite beats. Modern. Minimal. Free.</p>
      </section>
      <section className="featured-section">
        <h2 className="featured-title">Featured playlists</h2>
        <div className="featured-grid">
          {songs.map((song, idx) => (
            <div className="music-card" key={idx}>
              <img className="music-cover" src={song.cover_url} alt={song.title} />
              <div className="music-info">
                <div className="music-title">{song.title}</div>
                <div className="music-artist">{song.artist}</div>
              </div>
              <audio className="music-audio" controls src={song.audio_url} preload="none" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MusicList;