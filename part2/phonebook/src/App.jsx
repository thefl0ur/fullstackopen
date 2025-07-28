import { useState } from 'react'

import AddForm from './AddForm'
import FilterForm from './FilterForm'
import Display from './Display'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: '1' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: '2' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: '3' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: '4' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setnewFilter] = useState('')

  const onChangeNameInput = (event) => {
    setNewName(event.target.value)
  }

  const onChangePhonenNumberInput = (event) => {
    setNewPhone(event.target.value)
  }
  const filteredPersons = newFilter
    ? persons.filter(person => (
        person.name.toLocaleLowerCase().indexOf(newFilter.toLocaleLowerCase()) != -1
      )
    )
    : persons

  const onChangeFilterInput = (event) => {
    setnewFilter(event.target.value)

  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.filter(person => person.name == newName).length){
        alert(`${newName} is already added to phonebook`)
        return
    }

    let newUser = {
      name: newName,
      id: String(persons.length + 1),
      phoneNumber: newPhone
    }

    setPersons(persons.concat(newUser));
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={newFilter} onChange={onChangeFilterInput}/>
      <br/>
      <AddForm
        newName={newName}
        newPhone={newPhone}
        changeNameInput={onChangeNameInput}
        changePhoneInput={onChangePhonenNumberInput}
        submit={onSubmit}
      />
      <h2>Numbers</h2>
      <Display persons={filteredPersons}/>
    </div>
  )
}

export default App