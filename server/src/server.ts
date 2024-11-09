import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { route } from './routes';
import { setupMongo } from './database';

const app = express();
const port = process.env.PORT;

setupMongo();
app.use(cors());
app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log(`🎇 Server has started in port ${port}!`);
});
