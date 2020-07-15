import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connection from './config/db'
require('dotenv').config()
import AuthRouter from './routes/auth';
import shopRoute from './routes/shop';

const app:Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to crownstack!');
});
// Get static files and folder

app.use(express.static('public'))

//Middleware set
app.use(express.json())

app.use(cors());
app.use('/api/auth', AuthRouter);
app.use('/api/shop', shopRoute);

app.listen(process.env.PORT, err =>{

    if(err)
      return console.error(err)
    else
    console.log(`Server is running on ${process.env.PORT}`);
})

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});



