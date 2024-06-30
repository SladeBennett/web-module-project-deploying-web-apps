import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let bugs = [
  {
    id: getId(), engName: 'Black Widow', latName: 'Latrodectus',
    bio: "The black widow is easily recognized by her Coal-black body and red hourglass marking"
  }, 
  {
    id: getId(), engName: 'Daring Jumping Spider', latName: 'Phiddipus Audax',
    bio: "A common jumping spider identified by their large eyes and iridescent chelicerae"
  },
]

const initialInputs = () => ({
  engName: "",
  latName: "",
  bio: ""
})

export default function App() {
  const [arachnids, setArachnids] = useState(bugs)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(initialInputs())

  useEffect(() => {
    if (editing == null) {
      setValues(initialInputs())
    } else {
      const { engName, latName, bio } = arachnids.find(ara => ara.id == editing)
      setValues({ engName, latName, bio })
    }
  }, [editing])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues(prevValues => ({ ... prevValues, [id]: value}))
  }

  const edit = id => {
    setEditing(id)
  }
  const submitNewBug = () => {
    const { engName, latName, bio } = values
    const newBug = { engName, latName, bio, id: getId() }
    setArachnids([...arachnids, newBug])
    setValues(initialInputs())
  }

  const editExistingBug = () => {
    setArachnids(prevBugs => prevBugs.map(bug => {
      if (bug.id == editing) {
        return { ...bug, ...values }
      }
      return bug
    }))
    setValues(initialInputs())
    setEditing(null)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    if (editing) {
      editExistingBug()
    } else {
      submitNewBug()
    }
  }
  return (
    <div>
      <div id="bugsList">
        <h2>Favorite Arachnids</h2>
        <div>
          {
            arachnids.map(ara => (
              <div key={ara.id} className="Bug">
                <div>
                  <h4>{ara.engName} {ara.latName}</h4>
                  <p>{ara.bio}</p>
                </div>
                <button onClick={() => edit(ara.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="bugsForm">
        <h2>{editing ? 'Edit' : 'Add'} a new Bug</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='engName'>English Name </label>
            <input onChange={onChange} value={values.engName} id='engName' type='text' placeholder='Type English Name' />
          </div>

          <div>
            <label htmlFor='latName'>Latin Name </label>
            <input onChange={onChange} value={values.latName} id='latName' type='text' placeholder='Type Latin Name' />
          </div>

          <div>
            <label htmlFor='bio'>Bio </label>
            <textarea onChange={onChange} value={values.bio} id='bio' placeholder='Type Bio' />
          </div>

          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}


