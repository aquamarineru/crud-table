import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/userRoute.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const port= process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

 app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
},); 

app.use('/api', route);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Успешное подключение к MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });

app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${port}`);
});
