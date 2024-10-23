import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  //State
  const[notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: ''
  })
  
  // Use Effect
  useEffect(() => {
    fetchNotes()
  }, [])

  // Functions
  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:3000/notes')

    setNotes(res.data.notes)

    console.log(res)
  }

  const updateCreateFormField = (e) => {
    const {name, value} = e.target

    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }

  const createNote = async (e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:3000/notes", createForm)
    setNotes([...notes, res.data.note])
    console.log(res)

    //Clear form state
    setCreateForm({title: "", body: ""})
  }

  const deleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`)
    
    //Update State
    const newNotes = [...notes].filter(note => {
      return note._id !== _id
    })

    setNotes(newNotes)
  }

    return (
      <div className="App">
        <div>
          <h2>Notes:</h2>
          {notes && notes.map(note => {
            return (<div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>)
          })}
        </div>
        <div>
          <h2>Update Note</h2>
          <form>
            <input name="title" />
            <textarea name="body" />
            <button type="submit">Update Note</button>
          </form>
        </div>
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input onChange={updateCreateFormField} value={createForm.title} name='title' />
            <textarea onChange={updateCreateFormField} value={createForm.body} name='body' />
            <button type="submit">Add Note</button>
          </form>
        </div>
      </div>
  );
}

export default App;
