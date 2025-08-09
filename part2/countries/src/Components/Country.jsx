import Weather from './Weather'

const Country = ({country}) => {
  const capital = country.capital[0]

  return (
        <div>
        <h1>{country.name.common}</h1>
        <div>
          Capital: {capital} <br/>
          Population: {country.population} <br/>
          Area: {country.area}
        </div> <br/>
        <div>
          Languages: <br/>
          <ul>
            {
              Object.values(country.languages).map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))
            }
          </ul>
        </div>
        <img src={country.flags['svg']} alt={country.flags['alt']} width="10%"/>
        <Weather city={capital} />
      </div>
    )
  }

export default Country