import mongoose from 'mongoose';

const database = process.env.NODE_ENV === 'test' ? 'test' : 'coding-coach';
const dbURI = process.env.MONGO_DB_URI || `mongodb://localhost/${database}`;
mongoose.connect(
  dbURI, {
    useNewUrlParser: true,
  },
);

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error with mongodb connection');
  console.log(err);
  ERROR(err);
});
db.once('open', () => {
  INFO(`Connected to mongodb: ${dbURI}`);
});

export default db;
