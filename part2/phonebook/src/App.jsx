import { useState, useEffect } from 'react'

import AddForm from './AddForm'
import FilterForm from './FilterForm'
import Display from './Display'
import PersonService from './PersonService'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const showMessage = (text, isError) => {
    setNotification({
      message: text,
      isError: isError,
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const getPersons = () => {
    PersonService.get().then(persons => {
      setPersons(persons)
    })
  }

  const savePerson = (person) => {
    PersonService.save(person).then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewPhone('')
        showMessage(`User ${person.name} was added`, false)
      }
    )
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

    const existingUser = persons.find(person => person.name == newName)
    if (existingUser){
        if (window.confirm(`${existingUser.name} is already in phonebook. Update record?`)) {
            return updatePerson({...existingUser, phoneNumber: newPhone})
        }
        else {
          return
        }
    }

    let newUser = {
      number: newPhone,
      name: newName,
    }

    savePerson(newUser)
  }

  const onDelete = (id) => {
    const personToRemove = persons.find(person => person.id == id)
    if (window.confirm(`Delete user ${personToRemove.name}?`)) {
      PersonService.remove(personToRemove).then(
        _ => {
          setPersons(persons.filter(person => person.id != id))
        }
      )
    }
  }

  const updatePerson = (person) => {
    PersonService.update(person).then(
      updatedPerson => {
        setPersons(persons.map(person => person.id == updatedPerson.id ? updatedPerson: person))
      }
    ).catch(
      error => {
        const message = error.status == 404? `User ${person.name} was not found`: 'Something gone wrong'
        showMessage(message, true)
      }
    )
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
        isEnabled={newPhone.length > 0 & newName.length > 0}
      />
      <Notification notification={notification}/>
      <h2>Numbers</h2>
      <Display persons={filteredPersons} deleteHandler={onDelete}/>
    </div>
  )
}

export default App