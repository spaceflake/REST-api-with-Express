import 'animate.css'
import ListItem from './ListItem'

function List({ memberList, handleEdit, deleteMember, selectedId }) {
  return (
    <div>
      <ul className="list">
        {memberList?.length > 0 ? (
          memberList.map((member) => (
            <ListItem
              key={member.id}
              {...{ member, handleEdit, deleteMember, selectedId }}
            />
          ))
        ) : (
          <p>No members yet. Let's create one...</p>
        )}
      </ul>
    </div>
  )
}

export default List
