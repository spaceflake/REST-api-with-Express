import 'animate.css'

function ListItem({ member, handleEdit, deleteMember, selectedId }) {
  return (
    <li
      id={member.id}
      className={
        selectedId === member.id
          ? ' editBorder card animate__animated animate__fadeInLeft animate__delay-1s'
          : ' card animate__animated animate__fadeInLeft animate__delay-1s'
      }
      key={member.id}
    >
      <p className="card_title">Name: {member.name}</p>
      <p>Age: {member.age}</p>
      <div className="btn-group">
        <button className="btn" onClick={handleEdit} data-id={member.id}>
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
  )
}

export default ListItem
