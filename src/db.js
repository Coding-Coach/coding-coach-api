import mongoose from 'mongoose'
console.log(process.env.NODE_ENV)
const database = process.env.NODE_ENV === 'test' ? 'test' : 'coding-coach'
const dbURI = `mongodb://localhost/${database}`
mongoose.connect(dbURI)
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => {
  console.log(`Connected to ${dbURI}`)
})

export default db
