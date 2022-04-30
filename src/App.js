import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Header from './components/Header'
import List from './components/List'
import Form from './components/Form'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css'
import './css/App.css'

const App = () => {
  const [memberList, setMemberList] = useState([])
  const [inputs, setInputs] = useState({})
  const [editing, setEditing] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const formRef = useRef()

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/members')
      const result = await res.json()
      setMemberList(result)
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
      const id = e.target.dataset.id
      const url = `http://localhost:4000/api/members/${id}`
      const res = await fetch(url)
      const result = await res.json()
      setInputs(result)
      scrollToForm()
      setEditing(true)
      setSelectedId(id)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMember = async (e) => {
    try {
      const id = e.target.dataset.id

      const res = await fetch(`http://localhost:4000/api/members/${id}`, {
        method: 'DELETE',
      })
      const resData = await res.json()
      if (resData.success) {
        toast.success(resData.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      }
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
        setEditing(false)
        setSelectedId(null)
      } else {
        requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputs),
        }
      }
      const res = await fetch(url, requestOptions)
      const resData = await res.json()
      if (resData.success) {
        toast.success(resData.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      }
      await fetchMembers()
      setEditing(false)
      setInputs({})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Header />
      <h2>All current members</h2>
      <ToastContainer theme="dark" />
      <div className="container">
        <List
          {...{
            memberList,
            handleEdit,
            deleteMember,
            selectedId,
          }}
        />
        <Form
          {...{
            handleSubmit,
            editing,
            inputs,
            handleChange,
            setEditing,
            setInputs,
            selectedId,
            setSelectedId,
            formRef,
          }}
        />
      </div>
      <Footer />
    </div>
  )
}

export default App
