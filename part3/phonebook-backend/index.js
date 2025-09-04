require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const PhonebookRecord = require('./models/phonebookRecord')

const LOGGING_FROMAT = ":method :url :status :res[content-length] - :response-time ms - :body"
const PORT = process.env.PORT

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

const unknownEndpointHandler = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const app = express()
app.use(express.json())
app.use(morgan(LOGGING_FROMAT))
app.use(express.static('dist'))

app.get("/api/persons", (req, resp, next) => {
    PhonebookRecord.find({}).then(
       records => { resp.json(records) }
    ).catch(
        (error) => next(error)
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

app.delete("/api/persons/:id", (req, resp, next) => {
    PhonebookRecord.findByIdAndDelete(req.params.id).then(
        _ => {
            return resp.status(204).end()
        }
    ).catch(
        (error) => next(error)
    )
})

app.post("/api/persons/", (req, resp, next) => {
    const record = new PhonebookRecord({
        "name": req.body.name,
        "number": req.body.number,
    })

    if (!record.name || !record.number) {
        return resp.status(400).send({"error": "Missing required field"})
    }

    record.save().then( addedRecord => {
        resp.json(addedRecord)
    }).catch(
        (error) => next(error)
    )
})

app.use(unknownEndpointHandler)
app.use(errorHandler)

app.listen(PORT, () => {console.log(`Start webserver on ${PORT}`)})