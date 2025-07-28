import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1'},
  ]) 
  const [newName, setNewName] = useState('')

  const onChange = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    let newUser = {
      name: newName,
      id: String(persons.length + 1)
    }

    setPersons(persons.concat(newUser));
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => (
          <Person key={person.id} person={person}/>
          )
        )
      }
    </div>
  )
}

export default App