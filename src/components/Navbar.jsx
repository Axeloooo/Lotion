import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="left-container">
        <button>&#9776;</button>
      </div>
      <div>
        <h1 className="navbar-title">Lotion</h1>
      </div>
      <div className="right-container"></div>
    </nav>
  );
}
