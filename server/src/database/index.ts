import mongoose from 'mongoose';

export const setupMongo = () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      console.log('💣 Connecting to Mongo.');
      mongoose.connect(process.env.MONGO_URL as string);
      console.log('👌 Mongo connected.');
    } catch (err) {
      console.log(`❌ Error: ${err}.`);
      return;
    }
  }
};
