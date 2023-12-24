import {
  Collection,
  Document,
  ObjectId,
  connect,
  connection as db,
} from 'mongoose';

const connectToDatabase = async () => {
  connect('mongodb://localhost:27017/evolute-test', {});
};

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const getCollection = <T extends Document>(name: string): Collection<T> => {
  return {} as any;
};

export { connectToDatabase, getCollection, ObjectId };
