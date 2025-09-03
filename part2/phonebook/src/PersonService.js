import axios from 'axios'

const baseUrl = '/api/persons'

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

const update = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => response.data)
}

export default {get, save, remove, update}