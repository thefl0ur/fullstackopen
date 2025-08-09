import Country from './Country'

const Display =({countries, setCountry}) => {
  const len = countries.length
  if (len == 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  if (len > 10) {
    return (
      <p> Too many matches, be more specific</p>
    )
  }

  return (
    <div>
      {
        countries.map((country, idx) => (
          <p key={idx}>
            {country.name.common} &nbsp;
            <button onClick={ () => (setCountry(country.name.common)) }>Show</button>
          </p>
        ))
      }
    </div>
  )
}

export default Display