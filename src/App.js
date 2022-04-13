import { useEffect, useState } from 'react'
import Header from './components/Header'
import './css/App.css'

const App = () => {
  const [memberList, setMemberList] = useState([])
  const [inputs, setInputs] = useState({})
  const [editing, setEditing] = useState(false)

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

  const handleEdit = async (e) => {
    try {
      const id = e.target.id
      const url = `/api/members/${id}`
      const res = await fetch(url)
      const result = await res.json()
      setInputs(result)
      setEditing(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMember = async (e) => {
    try {
      const id = e.target.id

      await fetch(`/api/members/${id}`, {
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
      const url = `/api/members`
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
        .then((response) => console.log('Submitted successfully'))
        .catch((error) => console.log('Form submit error', error))
      setEditing(false)
      setInputs({})
      await fetchMembers()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="wrapper">
        {memberList?.length > 0 ? (
          memberList.map((member) => (
            <div className="card" key={member.id}>
              <p className="card_title">{member.name}</p>
              <p>{member.age}</p>
              <button id={member.id} onClick={handleEdit}>
                update
              </button>
              <button id={member.id} onClick={deleteMember}>
                delete
              </button>
            </div>
          ))
        ) : (
          <p>No members yet. Let's create one...</p>
        )}
      </div>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          {!editing ? <h1>Create a new Member</h1> : <h1>Update a Member</h1>}

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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
