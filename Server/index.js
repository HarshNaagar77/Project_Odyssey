import express from 'express';
import Router from './src/Routes/auth.routes.js';
import dotenv from 'dotenv';
import { connectdb } from './src/lib/db.js';
import cors from 'cors';
import MasterRouter from './src/Routes/master.route.js';
import ReportRouter from './src/Routes/report.route.js';
import EnteriesRouter from './src/Routes/enteries.route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Same as above
  'https://d717-103-80-22-106.ngrok-free.app',
  'https://cd8698e5baa3a4200b159e149d224eca.serveo.net'
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies if needed
})); 

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(Router);
app.use(MasterRouter);
app.use(ReportRouter);
app.use(EnteriesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
  connectdb();
});
