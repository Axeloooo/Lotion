import React from "react";

export default function Navbar({ handleHideSidebar }) {
  return (
    <nav className="navbar-container">
      <div className="left-container">
        <button onClick={handleHideSidebar}>&#9776;</button>
      </div>
      <div>
        <h1 className="navbar-title">Lotion</h1>
      </div>
      <div className="right-container"></div>
    </nav>
  );
}
