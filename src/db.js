import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/mongo')
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => {
  console.log('Connected to database')
})
