import 'animate.css'

function Form({
  handleSubmit,
  editing,
  inputs,
  handleChange,
  setEditing,
  setInputs,
  setSelectedId,
  formRef,
}) {
  return (
    <div
      className="form-container animate__animated animate__fadeInRight animate__delay-1s"
      ref={formRef}
    >
      <form className="form" onSubmit={handleSubmit}>
        {!editing ? <h1>Add Member</h1> : <h1>Update Member</h1>}
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={inputs?.name || ''}
          onChange={handleChange}
          id="name"
          required
        />
        <label htmlFor="age">Age: </label>
        <input
          type="number"
          min="15"
          max="100"
          name="age"
          value={inputs?.age || ''}
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
                setSelectedId(null)
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
