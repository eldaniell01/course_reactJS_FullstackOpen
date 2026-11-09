import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'
import notesServices from './services/notesServices'
import { Notification } from './components/Notification'
import { Footer } from './components/Footer'

import { Note } from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('algun error paso... ')

const hookGet = ()=>{
    notesServices
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
  }
  useEffect(hookGet, [])

  const addNote = (event)=>{
    event.preventDefault()
    const noteObject ={
      content: newNote,
      important: Math.random()>0.5,
    }
    notesServices
        .create(noteObject)
        .then(returnNote =>{
          setNotes(notes.concat(returnNote))
          setNewNote('')
        })
  }

  const toggleImportanceOf = (id)=>{
    const url = `/api/notes/${id}`
    const note = notes.find(n=>n.id === id)
    const changedNote = {...note, important: !note.important}
    notesServices
        .update(id, changedNote)
        .then(returnNote => {
          setNotes(notes.map(note=>note.id===id ? returnNote:note))
        })
        .catch(error => {
          setErrorMessage(`Note ${note.content} fue eliminada desde el servidor`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setNotes(notes.filter(n=>n.id !== id))
        })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note=> note.important)

  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <>
      <h1>NOTAS</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>show{showAll ? 'important': 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => <Note 
          key={note.id} 
          note={note}
          toggleImportance={()=>toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">GUARDAR</button>
      </form>
      <Footer/>
    </>
  )
}

export default App
