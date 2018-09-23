import { GraphQLClient } from 'graphql-request';
import mongoose from 'mongoose';
global.client = new GraphQLClient(`http://localhost:${process.env.PORT || 3000}/graphql`);

function clearDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) reject(err);
      if (collections.length === 0) resolve();
      collections.forEach(({ name }, i) => {
        mongoose.connection.db.dropCollection(name, (err) => {
          if (err) reject(err);
          if (i === collections.length - 1) resolve();
        });
      });
    });
  });
}

beforeAll((done) => {
  mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
  mongoose.connection.once('open', done);
});

beforeEach(async (done) => {
  await clearDatabase();
  done();
});

afterAll(async (done) => {
  await clearDatabase();
  mongoose.disconnect(done);
});
