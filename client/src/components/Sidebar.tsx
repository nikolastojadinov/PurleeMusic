import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <span className="sidebar-icon">🎧</span>
      <span className="sidebar-title">PurpleMusic</span>
    </div>
    <nav className="sidebar-nav">
      <NavLink to="/" end className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>Home</NavLink>
      <NavLink to="/search" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>Search</NavLink>
      <NavLink to="/library" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>My Library</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
