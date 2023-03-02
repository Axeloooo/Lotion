import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
  notes,
  handleAddNote,
  setActiveNote,
  activeNote,
}) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button onClick={handleAddNote}>+</button>
      </div>

      <div className="sidebar-notes">
        {notes.map((note) => (
          <Link
            to={`notes/${note.id}`}
            style={{ textDecoration: "none", color: "#121213" }}
          >
            <div
              className={`sidebar-note ${note.id === activeNote && "active"}`}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
              </div>
              <p>{note.body && note.body.substring(0, 100) + "..."}</p>
              <small className="note-meta">
                Last modified {note.lastModified}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
