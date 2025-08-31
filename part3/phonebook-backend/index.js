const express = require("express")
const app = express()

const PORT = 3001
let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, resp) => {
    resp.json(notes)
})

app.get("/info", (req, resp) => {
    resp.send(
        `<p>Phonebook contains info for ${notes.length} persons<br>${new Date()}</p>`
    )
})

app.listen(PORT, () => {console.log(`Start webserver on ${PORT}`)})