
import React from 'react';
import './App.css';

import MusicList from './components/MusicList';
import './components/BottomNav.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';





function App() {
  const location = useLocation();
  return (
    <div className="App spotify-theme mobile-layout" style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* HEADER */}
      <header className="pm-header" style={{
        width: '100%',
        background: 'transparent',
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
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#f9e24c" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-7 7v2.5a2.5 2.5 0 0 0 2 2.45V9a5 5 0 0 1 10 0v4.95a2.5 2.5 0 0 0 2-2.45V9a7 7 0 0 0-7-7Zm0 20a4.5 4.5 0 0 1-4.5-4.5V13a1 1 0 1 1 2 0v4.5a2.5 2.5 0 0 0 5 0V13a1 1 0 1 1 2 0v4.5A4.5 4.5 0 0 1 12 22Z"/></svg>
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
          <Route path="/" element={<MusicList />} />
          <Route path="/search" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>Search Page</div>} />
          <Route path="/liked" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>Liked Songs</div>} />
          <Route path="/playlists" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#fff'}}>My Playlists</div>} />
        </Routes>
      </main>
      {/* FOOTER NAV */}
      <footer className="pm-footer-nav" style={{
        width:'100%',
        background:'#111',
        borderTop:'1.5px solid #232323',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'2.5rem',
        padding:'0.7rem 0 0.3rem 0',
        position:'sticky',
        bottom:0,
        zIndex:99,
      }}>
        <Link to="/" className={location.pathname==='/' ? 'pm-footer-icon active' : 'pm-footer-icon'} title="Home" style={{textDecoration:'none'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
        </Link>
        <Link to="/search" className={location.pathname==='/search' ? 'pm-footer-icon active' : 'pm-footer-icon'} title="Search" style={{textDecoration:'none'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </Link>
        <Link to="/liked" className={location.pathname==='/liked' ? 'pm-footer-icon active' : 'pm-footer-icon'} title="Liked Songs" style={{textDecoration:'none'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </Link>
        <Link to="/playlists" className={location.pathname==='/playlists' ? 'pm-footer-icon active' : 'pm-footer-icon'} title="My Playlists" style={{textDecoration:'none'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
        </Link>
      </footer>
    </div>
  );
}

export default App;
