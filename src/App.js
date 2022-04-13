import { useEffect, useState } from 'react'
import Header from './components/Header'
import './css/App.css'

const App = () => {
  const [memberList, setMemberList] = useState([])
  const [inputs, setInputs] = useState({})
  const [editing, setEditing] = useState(false)
  const [selected, setSelected] = useState(false)
  const [selectedId, setSelectedId] = useState()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const fetchMembers = async () => {
    try {
      const members = await fetch('/api/members').then((res) => res.json())

      setMemberList(members)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchMembers()
    }
    fetchData()
  }, [])

  const toggleBorder = (id) => {
    if (selected) {
      document.getElementById(id).classList.remove('editBorder')
    } else {
      document.getElementById(id).classList.add('editBorder')
    }
  }

  const handleEdit = async (e) => {
    try {
      const id = e.target.dataset.id
      const url = `http://localhost:4000/api/members/${id}`
      const res = await fetch(url)
      const result = await res.json()
      setInputs(result)
      setEditing(true)
      setSelected(true)
      setSelectedId(id)
      toggleBorder(id)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMember = async (e) => {
    try {
      const id = e.target.dataset.id

      await fetch(`http://localhost:4000/api/members/${id}`, {
        method: 'DELETE',
      })
      await fetchMembers()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const url = `http://localhost:4000/api/members`
      let requestOptions
      if (editing) {
        requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputs),
        }
      } else {
        requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputs),
        }
      }
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log('Form submit error', error))
      await fetchMembers()
      setEditing(false)
      setInputs({})
      setSelected(false)
      toggleBorder(selectedId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="container">
        <div>
          <ul className="list">
            {memberList?.length > 0 ? (
              memberList.map((member) => (
                <li id={member.id} className="card" key={member.id}>
                  <p className="card_title">Name: {member.name}</p>
                  <p>Age: {member.age}</p>
                  <div className="btn-group">
                    <button
                      className="btn"
                      onClick={handleEdit}
                      data-id={member.id}
                    >
                      update
                    </button>
                    <button
                      className="btn secondary"
                      onClick={deleteMember}
                      data-id={member.id}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No members yet. Let's create one...</p>
            )}
          </ul>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            {!editing ? <h1>Add Member</h1> : <h1>Update Member</h1>}
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={inputs.name || ''}
              onChange={handleChange}
              id="name"
              required
            />
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              name="age"
              value={inputs.age || ''}
              onChange={handleChange}
              id="age"
              required
            />
            <div className="btn-group">
              <button type="submit" className="btn">
                Submit
              </button>
              {editing && (
                <button
                  onClick={() => {
                    setEditing(false)
                    setInputs({})
                    setSelected(false)
                    toggleBorder(selectedId)
                  }}
                  className="btn secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
