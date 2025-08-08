const Country = ({country}) => {
    return (
        <div>
        <h1>{country.name.common}</h1>
        <div>
          Capital: {country.capital[0]} <br/>
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
        <img src={country.flags['svg']} alt={country.flags['alt']}/>
      </div>
    )
  }

export default Country;