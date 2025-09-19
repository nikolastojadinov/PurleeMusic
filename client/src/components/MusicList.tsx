import React from "react";
import { usePlayer } from "./PlayerContext";
import { openPlayerWithTrack } from "./MusicPlayer";
import type { Song } from "./PlayerContext";
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
  function renderPlayButton(song: Song) {
    return (
      <button
        className="music-play-btn"
        onClick={() => openPlayerWithTrack && openPlayerWithTrack(song)}
        style={{
          background: 'linear-gradient(90deg,#a259ff 60%,#f9e24c 100%)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px #0005',
          cursor: 'pointer',
          marginLeft: 8
        }}
        aria-label="Play"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="9" fill="#fff" fillOpacity="0.18"/>
          <path d="M7.5 6.5V11.5L12 9L7.5 6.5Z" fill="#fff"/>
        </svg>
      </button>
    );
  }
  const { currentSong, isPlaying } = usePlayer();


  // Renderuje samo ikonu, bez play dugmeta, za Recently Played
  const renderIcon = (song: any) => {
    const isActive = currentSong && currentSong.audio_url === song.audio_url;
    return (
      <span className={"music-h-play" + (isActive ? (isPlaying ? " playing" : " paused") : "") }>
        {isActive ? (
          isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><rect x="9" y="8" width="2.8" height="8" rx="1.2" fill="#a259ff"/><rect x="14.2" y="8" width="2.8" height="8" rx="1.2" fill="#a259ff"/></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><polygon points="10,8 17,12 10,16" fill="#a259ff"/></svg>
          )
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" fill="#181818"/><polygon points="10,8 17,12 10,16" fill="#a259ff"/></svg>
        )}
      </span>
    );
  };

  return (
    <div className="home-hero-wrap">
      <section className="music-section">
        <h2 className="music-section-title">Recently Played</h2>
        <div className="music-horizontal-list">
          {recentlyPlayed.map((song, idx) => (
            <div className="music-h-card" key={idx}>
              <div className="music-h-cover-wrap" style={{position:'relative',cursor:'pointer'}} onClick={() => openPlayerWithTrack && openPlayerWithTrack(song)}>
                <img className="music-h-cover" src={song.cover_url} alt={song.title} />
                {renderIcon(song)}
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
        <ul className="music-vertical-list" style={{listStyle:'none',margin:0,padding:0}}>
          {madeForYou.map((song, idx) => (
            <li key={idx} className="music-v-list-item" style={{display:'flex',alignItems:'center',gap:'1.1rem',padding:'0.7rem 0.5rem',borderBottom:'1px solid #232323'}}>
              <img className="music-h-cover" src={song.cover_url} alt={song.title} style={{width:48,height:48,borderRadius:8,objectFit:'cover',boxShadow:'0 2px 12px #000a'}} />
              <div style={{flex:1,minWidth:0}}>
                <div className="music-h-title" style={{fontWeight:700,fontSize:'1.08rem',color:'#f9e24c',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{song.title}</div>
                <div className="music-h-artist" style={{fontWeight:500,fontSize:'0.98rem',color:'#b3b3b3',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{song.artist}</div>
              </div>
              {renderPlayButton(song)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MusicList;