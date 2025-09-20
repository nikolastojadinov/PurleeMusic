import React from "react";
// import { usePlayer } from "./PlayerContext";
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
        onClick={e => { e.stopPropagation(); openPlayerWithTrack && openPlayerWithTrack(song); }}
        aria-label="Play"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#fff"/>
          <polygon points="12,9 20,14 12,19" fill="#222"/>
        </svg>
      </button>
    );
  }
  // const { currentSong, isPlaying } = usePlayer();



  return (
    <div className="home-hero-wrap">
      <section className="music-section">
        <h2 className="music-section-title">Recently Played</h2>
        <div className="music-horizontal-list" style={{display:'flex',overflowX:'auto',gap:'16px',padding:'0.5rem 0 1.2rem 0'}}>
          {recentlyPlayed.map((song, idx) => (
            <div className="music-h-card" key={idx} style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:150}}>
              <div
                className="music-h-cover-wrap"
                style={{width:150,height:150,marginBottom:10,cursor:'pointer',borderRadius:8,overflow:'hidden',boxShadow:'0 2px 16px #0007',position:'relative'}}
                onClick={() => openPlayerWithTrack && openPlayerWithTrack(song)}
              >
                <img
                  className="music-h-cover"
                  src={song.cover_url}
                  alt={song.title || "Album cover"}
                  style={{width:150,height:150,objectFit:'cover',borderRadius:8,display:'block'}}
                />
              </div>
              <div className="music-h-info" style={{width:'100%',textAlign:'center',marginTop:2}}>
                <div className="music-h-title" style={{fontWeight:600,fontSize:'1.01rem',color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:150}}>{song.title}</div>
                <div className="music-h-artist" style={{fontWeight:400,fontSize:'0.93rem',color:'#b3b3b3',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:150}}>{song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="music-section">
        <h2 className="music-section-title">Made For You</h2>
        <ul className="music-vertical-list" style={{listStyle:'none',margin:0,padding:0}}>
          {madeForYou.map((song, idx) => (
            <li
              key={idx}
              className="music-v-list-item made-for-you-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.7rem 0.5rem',
                borderBottom: '1px solid #232323',
                maxWidth: '100%',
                boxSizing: 'border-box',
                gap: 0
              }}
            >
              <img
                className="music-h-cover"
                src={song.cover_url}
                alt={song.title || "Album cover"}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  objectFit: 'cover',
                  boxShadow: '0 2px 12px #000a',
                  flexShrink: 0,
                  marginRight: 12
                }}
              />
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <div
                  className="music-h-title"
                  style={{
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    color: '#f9e24c',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.13
                  }}
                >
                  {song.title}
                </div>
                <div
                  className="music-h-artist"
                  style={{
                    fontWeight: 500,
                    fontSize: '0.98rem',
                    color: '#b3b3b3',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.08
                  }}
                >
                  {song.artist}
                </div>
              </div>
              <div
                className="made-for-you-icons"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginLeft: 12,
                  flexShrink: 0,
                  minWidth: 0
                }}
              >
                {/* Like ikona (placeholder) */}
                <button style={{background:'none',border:'none',padding:0,margin:0,cursor:'pointer',display:'flex',alignItems:'center'}} aria-label="Like">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                {/* Play dugme */}
                {renderPlayButton(song)}
                {/* Menu ikona (placeholder) */}
                <button style={{background:'none',border:'none',padding:0,margin:0,cursor:'pointer',display:'flex',alignItems:'center'}} aria-label="Menu">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MusicList;