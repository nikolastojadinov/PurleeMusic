import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">PurleeMusic</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">Home</li>
          <li>Search</li>
          <li>Library</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
