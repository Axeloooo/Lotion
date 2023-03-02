import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [notes, setNotes] = useState([]);

  const [activeNote, setActiveNote] = useState(false);

  const regex = /(<([^>]+)>)/gi;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      body: "",
      lastModified: formatDate(Date.now()),
    };
    setNotes([newNote, ...notes]);
  };

  const handleSaveNote = (id, title, body, date) => {
    const newTitle = title.replace(regex, "");
    const newBody = body.replace(regex, "");
    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note.id === id);
    newNotes[index].title = newTitle;
    newNotes[index].body = newBody;
    newNotes[index].lastModified = formatDate(date);
    setNotes(newNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const getNotes = localStorage.getItem("notes");
    if (getNotes) {
      setNotes(JSON.parse(getNotes));
    }
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Sidebar
          notes={notes}
          handleAddNote={handleAddNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/notes/:id"
            element={<Preview deleteNote={handleDeleteNote} notes={notes} />}
          />
          <Route
            path="notes/:id/edit"
            element={
              <Editor
                deleteNote={handleDeleteNote}
                saveNote={handleSaveNote}
                notes={notes}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
