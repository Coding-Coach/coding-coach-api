import mongoose from 'mongoose';

const database = process.env.NODE_ENV === 'test' ? 'test' : 'coding-coach';
const dbURI = process.env.MONGO_DB_URI || `mongodb://localhost/${database}`;
mongoose.connect(
  dbURI,
  { useNewUrlParser: true },
);

const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => {
  console.log(`Connected to mongodb: ${dbURI}`);
});

export default db;
