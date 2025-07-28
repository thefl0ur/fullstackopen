const Display = ({persons}) => {
  return (
    <div>
      {
        persons.map(person => (
          <Person key={person.id} person={person}/>
          )
        )
      }
    </div>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.phoneNumber}</p>
  )
}

export default Display