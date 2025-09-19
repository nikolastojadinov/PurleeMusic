import React, { useEffect, useState, useRef } from 'react';
import './MusicPlayer.css';
import { usePlayer } from './PlayerContext';

// Ikon SVG helper
const Icon = {
  Volume: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
  ),
  Heart: ({ filled }: { filled: boolean }) => (
    filled ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#a259ff" stroke="#a259ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    )
  ),
  Prev: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
  ),
  Next: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
  ),
  Play: ({ animate }: { animate: boolean }) => (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#a259ff"/><polygon points="19,15 36,24 19,33" fill="#fff" style={{transition:'all 0.2s', transform: animate ? 'scale(1.1)' : 'scale(1)'}}/></svg>
  ),
  Pause: ({ animate }: { animate: boolean }) => (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#a259ff"/><rect x="17" y="15" width="5" height="18" rx="2.5" fill="#fff" style={{transition:'all 0.2s', transform: animate ? 'scale(1.1)' : 'scale(1)'}}/><rect x="26" y="15" width="5" height="18" rx="2.5" fill="#fff" style={{transition:'all 0.2s', transform: animate ? 'scale(1.1)' : 'scale(1)'}}/></svg>
  ),
};

// Hardcoded playlist for next/prev (koristi MusicList songs)
const playlist = [
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

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, pause, resume, playSong, audioRef } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(1);
  const [animatePlay, setAnimatePlay] = useState(false);

  // Find current index in playlist
  const currentIdx = playlist.findIndex(
    (s) => s.audio_url === currentSong?.audio_url
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume, audioRef]);

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
    setIsLiked(false);
    if (currentSong && isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentSong, isPlaying, audioRef]);

  // Play animáció
  useEffect(() => {
    if (isPlaying) {
      setAnimatePlay(true);
      const t = setTimeout(() => setAnimatePlay(false), 250);
      return () => clearTimeout(t);
    }
  }, [isPlaying]);

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

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleLike = () => setIsLiked((v) => !v);

  const handlePrev = () => {
    if (currentIdx > 0) playSong(playlist[currentIdx - 1]);
  };
  const handleNext = () => {
    if (currentIdx < playlist.length - 1) playSong(playlist[currentIdx + 1]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="music-player sticky-player" style={{background:'#111',color:'#fff',boxShadow:'0 -2px 16px #0008',position:'sticky',bottom:0,zIndex:1000,padding:'0',width:'100%'}}>
      <audio
        ref={audioRef}
        src={currentSong.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
        preload="metadata"
      />
      <div className="player-main-row" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.5rem 1.2rem 0.2rem 1.2rem',gap:'1.2rem'}}>
        {/* Left: Cover + info */}
        <div className="player-left" style={{display:'flex',alignItems:'center',gap:'0.9rem',minWidth:0}}>
          <img src={currentSong.cover_url} alt={currentSong.title} style={{width:48,height:48,borderRadius:8,objectFit:'cover',boxShadow:'0 2px 8px #0006'}} />
          <div style={{display:'flex',flexDirection:'column',minWidth:0}}>
            <span style={{fontWeight:700,fontSize:'1.08rem',color:'#f9e24c',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',lineHeight:1.1}}>{currentSong.title}</span>
            <span style={{fontWeight:500,fontSize:'0.98rem',color:'#b3b3b3',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{currentSong.artist}</span>
          </div>
        </div>
        {/* Right: Controls */}
        <div className="player-controls" style={{display:'flex',alignItems:'center',gap:'0.7rem',flex:1,justifyContent:'flex-end'}}>
          <button className="player-btn volume-btn" style={{background:'none',border:'none',cursor:'pointer',padding:'0.3rem'}} tabIndex={-1}>
            <Icon.Volume />
          </button>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} style={{width:60,marginRight:8,accentColor:'#a259ff'}} />
          <button className="player-btn heart-btn" style={{background:'none',border:'none',cursor:'pointer',padding:'0.3rem'}} onClick={handleLike} aria-label="Like">
            <Icon.Heart filled={isLiked} />
          </button>
          <button className="player-btn prev-btn" style={{background:'none',border:'none',cursor:'pointer',padding:'0.3rem'}} onClick={handlePrev} disabled={currentIdx<=0} aria-label="Previous">
            <Icon.Prev />
          </button>
          <button className="player-btn play-pause-btn" style={{background:'none',border:'none',cursor:'pointer',padding:'0.3rem',margin:'0 0.2rem'}} onClick={isPlaying ? pause : resume} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Icon.Pause animate={animatePlay} /> : <Icon.Play animate={animatePlay} />}
          </button>
          <button className="player-btn next-btn" style={{background:'none',border:'none',cursor:'pointer',padding:'0.3rem'}} onClick={handleNext} disabled={currentIdx>=playlist.length-1} aria-label="Next">
            <Icon.Next />
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="player-progress" style={{display:'flex',alignItems:'center',gap:'10px',padding:'0.2rem 1.2rem 0.7rem 1.2rem'}}>
        <span className="time-current" style={{fontSize:'0.98rem',color:'#fff',minWidth:44,textAlign:'center'}}>{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          style={{flex:1,accentColor:'#a259ff',height:6,borderRadius:3,background:'#232323'}}
        />
        <span className="time-total" style={{fontSize:'0.98rem',color:'#fff',minWidth:44,textAlign:'center'}}>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default MusicPlayer;