const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://eldaniell01:${password}@ac-vqfb2by-shard-00-00.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-01.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-02.0sh3cuj.mongodb.net:27017/notes?ssl=true&replicaSet=atlas-10pb4k-shard-0&authSource=admin`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*const note = new Note({
  content: 'Programar Python',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

Note.find({important: false}).then(result=>{
    result.forEach(note=>{
        console.log(note)
    })
    mongoose.connection.close()
})

