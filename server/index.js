import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));



app.get('/', (req, res) => {
    res.send({ message: '[#] Connected!' });
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(3000, () =>{ 
            console.log('[#] Server Running at http://localhost:3000'); 
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();