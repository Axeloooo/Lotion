import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({
  deleteNote,
  saveNote,
  notes,
  hidden,
  value,
  setValue,
  title,
  setTitle,
  date,
  setDate,
}) {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (!note) {
      navigate("/");
    }
  }, [id, notes, navigate]);

  return (
    <div className={hidden ? "main-container-expanded" : "main-container"}>
      <div className="main-note-editor">
        <div className="main-note-header">
          <div className="main-note-title">
            <input
              className="title-editor"
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="datetime-local"
              className="main-note-calendar"
            ></input>
          </div>
          <div className="main-note-buttons">
            <Link to={`/notes/${id}`}>
              <button onClick={() => saveNote(id, title, value, date)}>
                Save
              </button>
            </Link>
            <button onClick={() => deleteNote(id)}>Delete</button>
          </div>
        </div>
        <ReactQuill
          placeholder="Type Something Here..."
          theme="snow"
          value={value}
          onChange={setValue}
        ></ReactQuill>
      </div>
    </div>
  );
}
