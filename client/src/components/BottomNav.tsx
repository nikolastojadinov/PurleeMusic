
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-btn${location.pathname === '/' ? ' active' : ''}`}>
        <span className="material-icons">home</span>
        <span>Home</span>
      </Link>
      <Link to="/search" className={`nav-btn${location.pathname === '/search' ? ' active' : ''}`}>
        <span className="material-icons">search</span>
        <span>Search</span>
      </Link>
      <Link to="/library" className={`nav-btn${location.pathname === '/library' ? ' active' : ''}`}>
        <span className="material-icons">library_music</span>
        <span>Library</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
