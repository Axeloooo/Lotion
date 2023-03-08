import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [hidden, setHidden] = useState(false);

  const [notes, setNotes] = useState([]);

  const [activeNote, setActiveNote] = useState(false);

  const [value, setValue] = useState("");

  const [title, setTitle] = useState("Untitled");

  const [date, setDate] = useState(new Date());

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
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter((note) => note.id !== id));
    }
    return;
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

  const handleHideSidebar = () => {
    if (!hidden) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  const handleEdit = (id) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setTitle(note.title);
      setValue(note.body);
      setDate(note.lastModified);
    }
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
        <Navbar handleHideSidebar={handleHideSidebar} />
        <Sidebar
          notes={notes}
          handleAddNote={handleAddNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          hidden={hidden}
        />
        <Routes>
          <Route path="/" element={<Main hidden={hidden} />} />
          <Route
            path="/notes/:id"
            element={
              <Preview
                deleteNote={handleDeleteNote}
                notes={notes}
                hidden={hidden}
                handleEdit={handleEdit}
              />
            }
          />
          <Route
            path="notes/:id/edit"
            element={
              <Editor
                deleteNote={handleDeleteNote}
                saveNote={handleSaveNote}
                notes={notes}
                hidden={hidden}
                value={value}
                setValue={setValue}
                title={title}
                setTitle={setTitle}
                date={date}
                setDate={setDate}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
