import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const savePerson = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

export default {getPersons, savePerson}