import { useState, useEffect } from 'react'

import axios from 'axios'

import AddForm from './AddForm'
import FilterForm from './FilterForm'
import Display from './Display'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setnewFilter] = useState('')

  const getPersons = () => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }
  
  useEffect(getPersons, [])

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