
import React from 'react';
import './App.css';
import RecentlyPlayed from './components/RecentlyPlayed';
import MusicPlayer from './components/MusicPlayer';
import { PlayerProvider } from './components/PlayerContext';
import './components/BottomNav.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const demoSongs = [
  {
    id: 1,
    title: "Retro Lounge",
    artist: "PurpleMusic Artist",
    coverUrl: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/F6897AAD-9902-4F0C-95EA-FD213A783D92.png",
  },
  {
    id: 2,
    title: "Deep Abstract Ambient",
    artist: "PurpleMusic Artist",
    coverUrl: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/621B279E-CA15-482E-849A-60D0774A9DD5.png",
  },
  {
    id: 3,
    title: "Running Night",
    artist: "PurpleMusic Artist",
    coverUrl: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/76DD6929-0A2A-4D7C-8E09-86124174600A.png",
  },
];
import MusicPlayer from './components/MusicPlayer';
import { PlayerProvider } from './components/PlayerContext';
import './components/BottomNav.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';





function App() {
  const location = useLocation();
  return (
    <PlayerProvider>
      <div className="App spotify-theme mobile-layout" style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* HEADER */}
      <header className="pm-header" style={{
        width: '100%',
        background: 'rgba(40,40,48,0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px 10px 32px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
          <span style={{
            display:'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            width:44,height:44,
            borderRadius:'50%',
            background:'linear-gradient(135deg,#a259ff 0%,#f9e24c 100%)',
            boxShadow:'0 2px 8px #0002',
            overflow:'hidden',
          }}>
            <img src={process.env.PUBLIC_URL + '/purplebeats-logo.png'} alt="PurpleBeats Logo" style={{width:38,height:38,objectFit:'contain',display:'block'}} />
          </span>
          <span style={{
            fontWeight:800,
            fontSize:'1.7rem',
            letterSpacing:'1.2px',
            fontFamily:'inherit',
            background:'linear-gradient(90deg,#a259ff 0%,#f9e24c 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            userSelect:'none',
          }}>PurpleMusic</span>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          <span style={{ fontSize: '2.1rem', color: '#fff', opacity: 0.88, cursor: 'pointer', padding: '0.2em 0.3em', borderRadius: '50%', transition: 'background 0.18s' }}
            title="Profile"
            tabIndex={0}
            onMouseOver={e => (e.currentTarget.style.background = '#232323')}
            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg>
          </span>
        </div>
      </header>
      {/* MAIN */}
      <main className="App-main" style={{flex:1}}>
        <Routes>
          <Route path="/" element={<RecentlyPlayed songs={demoSongs} />} />
          <Route path="/search" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>Search Page</div>} />
          <Route path="/liked" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>Liked Songs</div>} />
          <Route path="/playlists" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>My Playlists</div>} />
        </Routes>
      </main>
      {/* MUSIC PLAYER */}
      <MusicPlayer />
      {/* FOOTER NAV */}
      <footer className="pm-footer-nav" style={{
        width: '100%',
        background: 'rgba(40,40,48,0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: '1.5px solid #232323',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.2rem 0 0.1rem 0',
        position: 'sticky',
        bottom: 0,
        zIndex: 99,
        height: '64px',
      }}>
        <Link to="/" className={location.pathname==='/' ? 'pm-footer-icon active' : 'pm-footer-icon'} style={{textDecoration:'none',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: location.pathname==='/' ? '#a259ff' : '#b3b3b3'}}><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
          <span style={{fontSize:'0.82rem',marginTop:1,fontWeight:500,color: location.pathname==='/' ? '#a259ff' : '#b3b3b3'}}>Home</span>
        </Link>
        <Link to="/search" className={location.pathname==='/search' ? 'pm-footer-icon active' : 'pm-footer-icon'} style={{textDecoration:'none',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: location.pathname==='/search' ? '#a259ff' : '#b3b3b3'}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span style={{fontSize:'0.82rem',marginTop:1,fontWeight:500,color: location.pathname==='/search' ? '#a259ff' : '#b3b3b3'}}>Search</span>
        </Link>
        <Link to="/playlists" className={location.pathname==='/playlists' ? 'pm-footer-icon active' : 'pm-footer-icon'} style={{textDecoration:'none',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: location.pathname==='/playlists' ? '#a259ff' : '#b3b3b3'}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
          <span style={{fontSize:'0.82rem',marginTop:1,fontWeight:500,color: location.pathname==='/playlists' ? '#a259ff' : '#b3b3b3'}}>Library</span>
        </Link>
        <Link to="/liked" className={location.pathname==='/liked' ? 'pm-footer-icon active' : 'pm-footer-icon'} style={{textDecoration:'none',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: location.pathname==='/liked' ? '#a259ff' : '#b3b3b3'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span style={{fontSize:'0.82rem',marginTop:1,fontWeight:500,color: location.pathname==='/liked' ? '#a259ff' : '#b3b3b3'}}>Liked Songs</span>
        </Link>
      </footer>
    </div>
    </PlayerProvider>
  );
}

export default App;
