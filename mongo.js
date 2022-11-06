const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://akzykov:${password}@cluster0.gq5lbgr.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length) {
  case 5:
    mongoose
      .connect(uri)
      .then((result) => {
        const person = new Person({
          name: process.argv[3],
          number: process.argv[4],
        })

        return person.save()
      })
      .then((addedPerson) => {
        console.log(`Added ${addedPerson.name} number ${addedPerson.number} to the phonebook.`)
        return mongoose.connection.close()
      })
      .catch((err) => console.log(err))
    break
  case 3:
    mongoose
      .connect(uri)
      .then((result) => {
        Person.find({}).then(result => {
          result.forEach(person => {
            console.log(person)
          })
          mongoose.connection.close()
        })
      })
    break;
  default:
    console.log('Please reformat your request.')
}
