
import React from 'react';
import './App.css';
import MusicList from './components/MusicList';
import BottomNav from './components/BottomNav';
import './components/BottomNav.css';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App spotify-theme mobile-layout">
      <header className="App-header">
        <h1>🎵 PurleeMusic</h1>
        <p>Your music streaming experience</p>
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<MusicList />} />
          <Route path="/search" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem'}}>Search Page</div>} />
          <Route path="/library" element={<div style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem'}}>My Library Page</div>} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
