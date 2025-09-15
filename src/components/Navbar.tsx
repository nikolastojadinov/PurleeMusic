import React from 'react';
import './Navbar.css';

interface NavbarProps {
  user?: { username: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          🎵 PurpleBeats
        </div>
        <div className="navbar-menu">
          {user && (
            <div className="navbar-user">
              <span className="user-greeting">Hello, {user.username}!</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;