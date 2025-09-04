require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const PhonebookRecord = require('./models/phonebookRecord')

const LOGGING_FROMAT = ":method :url :status :res[content-length] - :response-time ms - :body"
const PORT = process.env.PORT

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(LOGGING_FROMAT))
app.use(express.static('dist'))

app.get("/api/persons", (req, resp) => {
    PhonebookRecord.find({}).then(
       records => { resp.json(records) }
    )
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
    const record = new PhonebookRecord({
        "name": req.body.name,
        "number": req.body.number,
    })

    if (!record.name || !record.number) {
        return resp.status(400).send({"error": "Missing required field"})
    }

    record.save().then( addedRecord => {
        resp.json(addedRecord)
    })
})

app.listen(PORT, () => {console.log(`Start webserver on ${PORT}`)})