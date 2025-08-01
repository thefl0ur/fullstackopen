import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const save = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const remove = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(response => response.data)
}


export default {get, save, remove}