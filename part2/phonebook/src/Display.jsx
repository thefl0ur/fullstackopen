const Display = ({persons, deleteHandler}) => {
  return (
    <div>
      {
        persons.map(person => (
            <Person key={person.id} person={person} deleteHandler={deleteHandler}/>
          )
        )
      }
    </div>
  )
}

const Person = ({person, deleteHandler}) => {
  return (
    <div>
      {person.name} {person.number} &nbsp;
      <button onClick={() => {deleteHandler(person.id)}}>Delete</button>
    </div>
  )
}

export default Display