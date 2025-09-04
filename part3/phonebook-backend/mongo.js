const mongoose = require('mongoose')

const BuildConnectionString = (password) => {
    return `mongodb+srv://admin:${password}@cluster0.ib3m8uk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
}

const phonebookRecordSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhonebookRecordModel = mongoose.model('phonebookRecord', phonebookRecordSchema)

const ReadRecords = () => {
    PhonebookRecordModel.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(record => {
          console.log(`${record.name} ${record.number}`)
        })
        mongoose.connection.close()
      })
}

const InsertRecord = (name, number) => {
    const record = new PhonebookRecordModel({
      name: name,
      number: number,
    })
    
    record.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })

}

argCount = process.argv.length
if (argCount != 3 && argCount != 5) {
  console.log('incorrect usage')
  process.exit(1)
}

mongoose.connect(BuildConnectionString(process.argv[2]))
mongoose.set('strictQuery',false)

if (argCount == 3) {
    ReadRecords()
}
else {
    InsertRecord(process.argv[3], process.argv[4])
}