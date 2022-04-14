import 'animate.css'

function Form({
  handleSubmit,
  editing,
  inputs,
  handleChange,
  setEditing,
  setInputs,
  setSelected,
  toggleBorder,
  selectedId,
}) {
  return (
    <div className="form-container animate__animated animate__fadeInRight animate__delay-1s">
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
  )
}

export default Form
