import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
 
  const [ notes, setNotes ] = useState([])

  console.log("Hello Integration")

  function fetchNotes() {
    axios.get('https://backendcohort2.onrender.com/api/notes')
    .then((res) => {
      setNotes(res.data.notes)
    })  
  }

  useEffect(() => {
   fetchNotes()
  }, []); // ✅ EMPTY dependency array
  

  // jis bhi method ki api call karni hai write axios.get
  // axios.get('http://localhost:3000/api/notes')
  // .then((res) => {
  //   setNotes(res.data.notes)
  // })

  function handleSubmit(e){
      e.preventDefault() // jab bhi form ko submit karte ho react ke ander toh page ko reload hone se rokega

      const {title, description} = e.target.elements;
      console.log(title.value, description.value);

      axios.post("https://backendcohort2.onrender.com/api/notes", { 
            title: title.value,   // Giving data in object form to the body as body need data in json format.
            description: description.value
      })
      .then((res) => {
        console.log(res.data)

        fetchNotes()

      })
  }

  function handleDeleteNode(noteId) {
    // console.log(noteId) // console noteId on the note we click we get its id

    axios.delete("https://backendcohort2.onrender.com/api/notes/"+noteId) 
    .then((res) => {
    console.log(res.data)

    fetchNotes()
})

  }

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit} >
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create note</button>
    </form>

    <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handleDeleteNode(note._id)}}>delete</button>
            </div>
          })
        }
      </div>

    </>
  )
}

export default App
