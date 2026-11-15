const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://eldaniell01:${password}@ac-vqfb2by-shard-00-00.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-01.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-02.0sh3cuj.mongodb.net:27017/cloud-based?ssl=true&replicaSet=atlas-10pb4k-shard-0&authSource=admin`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

/*const phonebook = new Phonebook({
  name: name,
  number: number,
})

phonebook.save().then(result => {
  console.log(`agregado ${name} numero ${number} a la agenda`)
  mongoose.connection.close()
})*/

Phonebook.find({}).then(result=>{
    console.log("numeros de telefono:")
    result.forEach(phone=>{
        
        console.log(phone.name, phone.number)
    })
    mongoose.connection.close()
})

