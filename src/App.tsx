import React from 'react';
import { usePiAuth } from './hooks/usePiAuth';
import Navbar from './components/Navbar';
import Login from './components/Login';
import MusicLibrary from './components/MusicLibrary';
import './App.css';

function App() {
  const { isAuthenticated, user, isLoading, error, login, logout } = usePiAuth();

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Initializing PurpleBeats...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} isLoading={isLoading} error={error} />;
  }

  return (
    <div className="App">
      <Navbar user={user} onLogout={logout} />
      <main className="main-content">
        <MusicLibrary />
      </main>
    </div>
  );
}

export default App;
