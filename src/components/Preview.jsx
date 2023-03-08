import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Preview({ deleteNote, notes, hidden, handleEdit }) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (!note) {
      navigate("/");
    }
  }, [id, notes, navigate]);

  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setTitle(note.title);
      setValue(note.body);
      setDate(note.lastModified);
    }
  }, [id, notes]);

  return (
    <div className={hidden ? "main-container-expanded" : "main-container"}>
      <div className="main-note-preview">
        <div className="main-note-header">
          <div className="main-note-title">
            <h1 className="title-preview">{title}</h1>
            <small className="note-meta">Last modified {date}</small>
          </div>
          <div className="main-note-buttons">
            <Link to={`/notes/${id}/edit`}>
              <button onClick={() => handleEdit(id)}>Edit</button>
            </Link>
            <button navigate={"/"} onClick={() => deleteNote(id)}>
              Delete
            </button>
          </div>
        </div>
        <div className="markdown-preview">{value}</div>
      </div>
    </div>
  );
}
