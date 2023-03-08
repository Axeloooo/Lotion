import React from "react";

export default function Main(hidden) {
  return (
    <div className={hidden ? "main-container-expanded" : "main-container"}>
      <div className="main-empty">
        <h1 className="main-empty-title">Select a note or create a new note</h1>
      </div>
    </div>
  );
}
