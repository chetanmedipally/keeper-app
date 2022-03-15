import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.json())  
    .then((responseData) => setNotes(responseData))
  },[]);

  function addNote(newNote) {
    
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    };
    
    fetch('http://localhost:5000', requestOptions)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
    })
  
    }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
    fetch('http://localhost:5000/'+id, { method: 'DELETE' })
        .then((response) => console.log(response));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
