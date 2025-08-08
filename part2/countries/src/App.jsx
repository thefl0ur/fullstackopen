import { useState, useEffect } from 'react'

import CountryService from './CountryService'
import Display from './Display'



function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const loadData = () => {
    CountryService.load().then(c => {
      setCountries(c)
    })
    
  }

  const setSearchValueFilter = (value) => {
    setSearchValue(value)
  }

  const inputHandler = (event) => {
    setSearchValueFilter(event.target.value)
  }

  const filteredCountries = searchValue
    ? countries.filter(country => (
      country.name.common.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) != -1
    ))
    : countries

  useEffect(loadData, [])
  
  return (
    <div>
      <div>
        Find countries: <input value={searchValue} onChange={inputHandler}></input>
      </div>
      <Display countries={filteredCountries} setCountry={setSearchValueFilter}/>
    </div>
  )
}

export default App
