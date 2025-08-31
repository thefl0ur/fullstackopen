const express = require("express")
const app = express()
app.use(express.json())

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

const genId = () => {
    return String(Math.floor(Math.random() * 100 + 1))
}

app.get("/api/persons", (req, resp) => {
    resp.json(notes)
})

app.get("/info", (req, resp) => {
    resp.send(
        `<p>Phonebook contains info for ${notes.length} persons<br>${new Date()}</p>`
    )
})

app.get("/api/persons/:id", (req, resp) => {
    const note = notes.find(x => x.id == req.params.id)

    if (!note){
        return resp.status(404).end()
    }

    resp.json(note)
})

app.delete("/api/persons/:id", (req, resp) => {
    const index = notes.findIndex(x=>x.id == req.params.id)

    if (index >= 0) {
        notes.splice(index, 1)
    }

    return resp.status(204).end()
})

app.post("/api/persons/", (req, resp) => {
    const note = req.body
    note.id = genId()

    notes = notes.concat(note)
    resp.json(note)
})

app.listen(PORT, () => {console.log(`Start webserver on ${PORT}`)})