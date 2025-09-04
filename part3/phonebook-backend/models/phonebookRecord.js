const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Should be at least 3 characters long.'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Should be at least 8 characters long.'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: number => `${number.value} is not a valid phone number!`
    },
    required: true
  }
})

phonebookRecordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const PhonebookRecordModel = mongoose.model('PhonebookRecord', phonebookRecordSchema)

module.exports = PhonebookRecordModel