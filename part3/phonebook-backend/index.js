const express = require("express")
const morgan = require("morgan")

const LOGGING_FROMAT = ":method :url :status :res[content-length] - :response-time ms - :body"
const PORT = process.env.PORT || 3001
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

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(LOGGING_FROMAT))
app.use(express.static('dist'))

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
    const note = {
        "id": genId(),
        "name": req.body.name,
        "number": req.body.number,
    }

    if (!note.name || !note.number) {
        return resp.status(400).send({"error": "Missing required field"})
    }

    const index = notes.findIndex(x => x.name == note.name)
    if (index != -1) {
        return resp.status(409).send({"error": "Name should be unique"})
    }

    notes = notes.concat(note)
    resp.json(note)
})

app.listen(PORT, () => {console.log(`Start webserver on ${PORT}`)})