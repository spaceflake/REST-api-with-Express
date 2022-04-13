function List({ memberList, handleEdit, deleteMember }) {
  return (
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
  )
}

export default List
